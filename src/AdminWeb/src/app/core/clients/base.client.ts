import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "@coreui/angular";
import { Observable, concat, map, of } from 'rxjs';
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
    return this.createRequest<TResponse>(this.#http.get<TResponse>(url, this.requestHeaders));
  }

  protected postRequest<TResponse>(
    endpoint: string,
    body: any,
    queryParams: HttpQueryParams = {}
  ): Observable<RawHttpResponse<TResponse>> {
    const url = this.createUrl(endpoint, queryParams);
    return this.createRequest<TResponse>(this.#http.post<TResponse>(url, body, this.requestHeaders));
  }

  protected deleteRequest(endpoint: string, queryParams: HttpQueryParams = {}): Observable<RawHttpResponse<unknown>> {
    const url = this.createUrl(endpoint, queryParams);
    return this.createRequest<unknown>(this.#http.delete(url, this.requestHeaders));
  }

  protected putRequest<TResponse>(endpoint: string, body: any, queryParams: HttpQueryParams = {}): Observable<RawHttpResponse<TResponse>> {
    const url = this.createUrl(endpoint, queryParams);
    return this.createRequest<TResponse>(this.#http.put<TResponse>(url, body, this.requestHeaders));
  }

  private createRequest<TResponse>(observable: Observable<TResponse>): Observable<RawHttpResponse<TResponse>> {
    return concat(
      of({ type: 'start' } as RawHttpResponse<TResponse>),
      observable.pipe(
        map(response => ({ type: 'finish', value: response }) as RawHttpResponse<TResponse>)
      )
    )
  }
}
