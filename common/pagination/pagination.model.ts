export class Pagination {
  skip: number = 1;
  limit: number = 15;

  constructor(page: number, pageSize?: number) {
    if (
      typeof page == "number" &&
      page > 0 &&
      typeof pageSize == "number" &&
      pageSize > 0 &&
      pageSize <= 100
    ) {
      this.limit = pageSize;
      this.skip = (page - 1) * pageSize;
    }
  }
}
