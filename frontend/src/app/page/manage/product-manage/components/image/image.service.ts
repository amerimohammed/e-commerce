import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  CustomResponse,
  ImageDeleteType,
  ImageType,
} from 'src/app/model/custom-response';
import { ProductImage } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly url = env.apiUrl + '/image';

  images = new BehaviorSubject<ProductImage[]>([]);

  constructor(private http: HttpClient) {}

  save(imageFile: File, token: string): Observable<CustomResponse<ImageType>> {
    console.log(imageFile);
    const imageFormData = new FormData();
    imageFormData.append('imageFile', imageFile, imageFile.name);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.post<CustomResponse<ImageType>>(
      this.url + '/save',
      imageFormData,
      requestOptions
    );
  }

  delete(
    imageId: number,
    token: string
  ): Observable<CustomResponse<ImageDeleteType>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.delete<CustomResponse<ImageDeleteType>>(
      this.url + '/delete/' + imageId,
      requestOptions
    );
  }
}
