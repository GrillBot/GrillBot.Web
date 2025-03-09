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

export interface SortParameters {
  orderBy?: string;
  descending?: boolean;
}

export type PaginatedType<T> = T & {
  pagination: PaginatedParams;
  sort?: SortParameters
};

export type WithPagination<T> = T & { pagination: PaginatedParams; };
export type WithSortAndPagination<T> = WithPagination<T> & { sort: SortParameters };

export interface ValidationProblemDetails {
  errors: { [K: string]: string[] };
  status: number;
  title: string;
}

export interface MessageResponse {
  message: string;
}
