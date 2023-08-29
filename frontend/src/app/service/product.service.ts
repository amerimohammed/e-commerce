import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import {
  CustomResponse,
  ProductDeleteType,
  ProductType,
  ProductsType,
} from '../model/custom-response';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly url = env.apiUrl + '/product';
  constructor(private http: HttpClient) {}

  getAllproducts(): Observable<CustomResponse<ProductsType>> {
    return this.http.get<CustomResponse<ProductsType>>(this.url + '/list');
  }

  getProduct(productId: number): Observable<CustomResponse<ProductType>> {
    return this.http.get<CustomResponse<ProductType>>(
      this.url + '/get/' + productId
    );
  }

  createProduct(product: Product): Observable<CustomResponse<ProductType>> {
    console.log(product);
    return this.http.post<CustomResponse<ProductType>>(
      this.url + '/save',
      product
    );
  }

  deleteProduct(
    product: Product
  ): Observable<CustomResponse<ProductDeleteType>> {
    console.log(product);
    return this.http.delete<CustomResponse<ProductDeleteType>>(
      this.url + `/delete/${product.productId}`
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    throw new Error(`An error occurred - Error code ${error.status}`);
  }
}
