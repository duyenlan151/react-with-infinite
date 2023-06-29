export interface DataResponse<T> {
  products: T[];
  limit: number;
  skip: number;
  total: number;
}

export interface DataError {
  status: number;
  message: string;
}

export interface ParamsRequest {
  search: string;
  skip: number;
  limit: number;
}
