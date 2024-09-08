import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "@coreui/angular";
import { Observable, throwError } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../managers/auth.manager';
import { environment } from "../../../environments/environment";

export type HttpQueryParams = { [key: string]: string };

export abstract class BaseClient {
  readonly #router = inject(Router);
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
}
