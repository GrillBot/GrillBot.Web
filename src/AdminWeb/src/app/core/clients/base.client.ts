import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, concat, from, map, of, switchMap } from 'rxjs';
import { environment } from "../../../environments/environment";
import { RawHttpResponse } from "../models/common";

export type HttpQueryParams = { [key: string]: string | string[] };

export abstract class BaseClient {
  readonly #http = inject(HttpClient);

  get httpClient(): HttpClient {
    return this.#http;
  }

  /**
   * No Authorization header: the session cookie (HttpOnly, set by the bot) travels with every
   * request, and the bot turns it into the access token on its side.
   */
  get requestHeaders(): {
    headers: HttpHeaders,
    withCredentials: boolean
  } {
    return {
      headers: new HttpHeaders({}),
      withCredentials: true
    };
  }

  protected createUrl(endpoint: string, queryParams: HttpQueryParams = {}): string {
    let url = environment.baseApiUri + `/${endpoint}`;

    if (queryParams && Object.keys(queryParams).length > 0) {
      const parameters: string = Object
        .entries(queryParams)
        .flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            : [`${encodeURIComponent(key)}=${encodeURIComponent(value)}`]
        )
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

  protected getFile(
    endpoint: string,
    queryParams: HttpQueryParams = {}
  ): Observable<RawHttpResponse<string>> {
    const url = this.createUrl(endpoint, queryParams);

    const request = this.#http
      .get(url, { ...this.requestHeaders, responseType: 'blob' })
      .pipe(switchMap(blob => {
        return from(new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;

          reader.readAsDataURL(blob);
        }));
      }));

    return this.createRequest(request);
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
