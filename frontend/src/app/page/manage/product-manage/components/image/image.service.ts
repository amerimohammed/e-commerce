import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CustomResponse,
  ImageDeleteType,
  ImageType,
} from 'src/app/model/custom-response';
import { ProductImage } from 'src/app/model/product';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly url = env.apiUrl + '/image';

  images = new BehaviorSubject<ProductImage[]>([]);
  constructor(private http: HttpClient) {}

  save(imageFile: File): Observable<CustomResponse<ImageType>> {
    console.log(imageFile);
    const imageFormData = new FormData();
    imageFormData.append('imageFile', imageFile, imageFile.name);

    return this.http.post<CustomResponse<ImageType>>(
      this.url + '/save',
      imageFormData
    );
  }

  delete(imageId: number): Observable<CustomResponse<ImageDeleteType>> {
    return this.http.delete<CustomResponse<ImageDeleteType>>(
      this.url + '/delete/' + imageId
    );
  }
}
