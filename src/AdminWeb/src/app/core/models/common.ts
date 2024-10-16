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

export interface PaginatedResponse<TData> {
  data: TData[];
  page: number;
  totalItemsCount: number;
}

export interface PaginatedParams {
  page: number;
  pageSize: number;
}

export interface SortParamters {
  orderBy?: string;
  descending?: boolean;
}
