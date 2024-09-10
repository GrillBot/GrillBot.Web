export interface RawHttpResponse<TResponse> {
  type: 'start' | 'finish',
  value?: TResponse
}

export interface HttpResponse<TResponse> {
  loading: boolean,
  value?: TResponse
}
