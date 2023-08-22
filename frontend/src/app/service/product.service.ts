import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { env } from 'src/environments/environment';
import { CustomResponse } from '../model/custom-response';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly url = env.apiUrl + '/product';
  constructor(private http: HttpClient) {}

  getAllproducts(): Observable<CustomResponse<Product[]>> {
    return this.http.get<CustomResponse<Product[]>>(this.url + '/list');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    throw new Error(`An error occurred - Error code ${error.status}`);
  }
}
