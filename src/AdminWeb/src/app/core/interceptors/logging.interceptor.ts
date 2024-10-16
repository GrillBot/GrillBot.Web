import { HttpEventType, HttpInterceptorFn } from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { tap } from "rxjs";

export const httpLoggingInterceptor = (): HttpInterceptorFn => {
  return (req, next) => {
    return next(req).pipe(tap(ev => {
      if (isDevMode() && ev.type === HttpEventType.Response) {
        console.log(`Time: ${new Date().toISOString()}\nExecuted HTTP request on ${req.method} ${req.urlWithParams}`);
      }
    }));
  };
};
