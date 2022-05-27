export class PaginatedData<T> {
  data: T[];

  paging: {
    page: number;
    pageSize: number;
    pageCount: number;
    recordCount: number;
  };
}
