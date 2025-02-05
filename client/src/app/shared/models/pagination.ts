export type Pagintaion<T> = {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T
}
