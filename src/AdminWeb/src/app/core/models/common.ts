import { FormControl } from "@angular/forms"

export interface RawHttpResponse<TResponse> {
  type: 'start' | 'finish',
  value?: TResponse
}

export interface HttpResponse<TResponse> {
  loading: boolean,
  value?: TResponse
}

export type IForm<T> = {
  [K in keyof T]?: any | FormControl<T[K]>;
}
