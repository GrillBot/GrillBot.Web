import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, isDevMode } from "@angular/core";
import { LocalStorageService } from "@coreui/angular";
import { Observable, catchError, concat, map, of, tap, throwError } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../managers/auth.manager';
import { environment } from "../../../environments/environment";
import { RawHttpResponse } from "../models/common";

export type HttpQueryParams = { [key: string]: string };

export abstract class BaseClient {
  readonly #storage = inject(LocalStorageService);
  readonly #http = inject(HttpClient);

  get httpClient(): HttpClient {
    return this.#http;
  }

  get requestHeaders(): {
    headers: HttpHeaders,
    withCredentials: boolean
  } {
    const token = this.#storage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      return {
        headers: new HttpHeaders({}),
        withCredentials: true
      };
    }

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      withCredentials: true
    };
  }

  protected catchError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }

  protected createUrl(endpoint: string, queryParams: HttpQueryParams = {}): string {
    let url = environment.baseApiUri + `/${endpoint}`;

    if (queryParams && Object.keys(queryParams).length > 0) {
      const parameters: string = Object
        .keys(queryParams)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
        .join('&');

      url += `?${parameters}`;
    }

    return url;
  }

  protected getRequest<TResponse>(
    endpoint: string,
    queryParams: HttpQueryParams = {}
  ): Observable<RawHttpResponse<TResponse>> {
    const url = this.createUrl(endpoint, queryParams);

    return concat(
      of({ type: 'start' } as RawHttpResponse<TResponse>),
      this.#http.get<TResponse>(url, this.requestHeaders).pipe(
        tap(_ => {
          if (isDevMode()) {
            console.log(`Time: ${new Date().toISOString()}\nExecuted HTTP request on ${url}\nQueryParams: ${Object.keys(queryParams).length}`);
          }
        }),
        map(response => ({ type: 'finish', value: response }) as RawHttpResponse<TResponse>),
        catchError(err => this.catchError(err))
      )
    );
  }
}
