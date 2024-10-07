import { HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { filter, finalize, of, Subject, tap } from "rxjs";

const requests = new Map<string, {
  src: string;
  data: HttpResponse<any>;
  data$: Subject<HttpResponse<any>>;
  params?: any;
  ttl?: number;
}>();

interface CacheOptions {
  urlsToCache?: string[];
  ttls?: { [url: string]: number },
  globalTTL?: number
}

export const httpCacheInterceptor = (options?: CacheOptions): HttpInterceptorFn => {
  const { urlsToCache = [] } = options ?? {};
  const _urlsToCache = urlsToCache.map(o => new RegExp(o));

  return (req, next) => {
    const key = getUniqueKey(req);
    const skipCache = !_urlsToCache.some(o => o.test(req.url));
    const prevRequestGetter = () => requests.get(key);
    const prevRequest = prevRequestGetter();

    if (!skipCache) {
      if (prevRequest) {
        const { data, data$, ttl } = prevRequest;

        if (!data$.closed) {
          return prevRequest.data$;
        }

        if (data && ttl && ttl > new Date().getTime()) {
          return of(prevRequest.data);
        }

        prevRequest.data$ = new Subject<any>();
      } else {
        requests.set(key, {
          src: req.url,
          data$: new Subject<any>(),
          data: new HttpResponse<any>(),
          params: req.body,
          ttl: getTTL(req.url, options)
        });
      }
    }

    return next(req).pipe(
      filter(res => res instanceof HttpResponse),
      tap(res => {
        const data = res as HttpResponse<any>;
        const request = prevRequestGetter();
        if (!request) return;

        request.data = data;
        request.ttl = getTTL(req.url, options);
        !request.data$.closed && request.data$.next(data);
      }),
      finalize(() => {
        const request = prevRequestGetter();
        request?.data$.complete();
        request?.data$.unsubscribe();
      })
    );
  }
};

const getUniqueKey = (req: HttpRequest<any>): string => {
  const bodySorted = sortObjectsByKey(req.body);
  return `${req.method}_${req.urlWithParams}_${JSON.stringify(bodySorted)}`;
}

const sortObjectsByKey = (obj: any): any => {
  const keysSorted = Object.keys(obj ?? '').sort();
  return keysSorted.reduce((_obj, key) => {
    const val = obj[key];
    _obj[key] = typeof val === 'object' ? sortObjectsByKey(val) : val;

    return _obj;
  }, {} as any);
};

const getTTL = (url: string, options?: CacheOptions): number | undefined => {
  const { ttls, globalTTL } = options ?? {};

  const getCustomTTL = () => {
    const matchedKey = Object.keys(ttls ?? '').find(o => url.split('?')[0].endsWith(o));
    return !ttls || !matchedKey ? null : ttls[matchedKey];
  };

  return new Date().getTime() + (getCustomTTL() || globalTTL || 0);
}
