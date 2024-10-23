import { IPaginatedResult } from "./paginated-result.interface";
import { ILimitation } from "./limitation.interface";

export class PaginationResult<T> implements IPaginatedResult<T> {
  total: number;
  page: number;
  pageSize: number;
  list: T[];
  constructor(list: T[], total: number, limitation: ILimitation) {
    this.list = list;
    this.total = total;
    this.pageSize = limitation.limit;
    this.page = isNaN(limitation.skip / limitation.limit + 1)
      ? 1
      : limitation.skip / limitation.limit + 1;
  }
}
