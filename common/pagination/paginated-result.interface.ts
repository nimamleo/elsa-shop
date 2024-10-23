export interface IPaginatedResult<T> {
  total: number;
  page: number;
  pageSize: number;
  list: T[];
}
