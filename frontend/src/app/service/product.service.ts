import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import {
  CustomResponse,
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    throw new Error(`An error occurred - Error code ${error.status}`);
  }
}
