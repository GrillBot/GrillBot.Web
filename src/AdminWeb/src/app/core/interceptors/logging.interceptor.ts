import { HttpInterceptorFn } from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { tap } from "rxjs";

export const httpLoggingInterceptor = (): HttpInterceptorFn => {
  return (req, next) => {
    return next(req).pipe(tap(_ => {
      if (isDevMode()) {
        console.log(`Time: ${new Date().toISOString()}\nExecuted HTTP request on ${req.urlWithParams}`);
      }
    }));
  };
};
