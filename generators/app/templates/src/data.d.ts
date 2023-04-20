export interface Response<T> {
  status: number;
  statusText: string;
  data: T;
}
