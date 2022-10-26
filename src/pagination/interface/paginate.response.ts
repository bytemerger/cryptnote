export interface PaginateResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    numOfPages: number;
    total: number;
  };
}
