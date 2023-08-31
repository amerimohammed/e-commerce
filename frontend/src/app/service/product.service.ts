import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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

  createProduct(
    product: Product,
    token: string
  ): Observable<CustomResponse<ProductType>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.post<CustomResponse<ProductType>>(
      this.url + '/save',
      product,
      requestOptions
    );
  }

  deleteProduct(
    product: Product,
    token: string
  ): Observable<CustomResponse<ProductDeleteType>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.delete<CustomResponse<ProductDeleteType>>(
      this.url + `/delete/${product.productId}`,
      requestOptions
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    throw new Error(`An error occurred - Error code ${error.status}`);
  }
}
