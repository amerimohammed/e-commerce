import { Product } from './product';

export type CustomResponse<T> = {
  timestamp: Date;
  statusCode: number;
  status: string;
  reason?: string;
  message?: string;
  developerMessage?: string;
  data: { [k in keyof T]: T[k] };
};

export type ProductType = {
  product: Product;
};

export type ProductsType = {
  products: Product[];
};

export type ProductDeleteType = {
  deleted: boolean;
};
