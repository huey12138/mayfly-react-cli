export interface FetchResult<T> {
  code: string;
  data: T;
  message: string;
}
