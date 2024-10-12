import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, EMPTY, throwError } from "rxjs";
import { AuthManager } from "../managers/auth.manager";

export const httpUnauthorizedInterceptor = (): HttpInterceptorFn => (req, next) => {
  const authManager = inject(AuthManager);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) {
        return throwError(() => err);
      }

      authManager.logout();
      return EMPTY;
    })
  );
}
