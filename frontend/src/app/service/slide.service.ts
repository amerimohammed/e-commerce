import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CustomResponse } from '../model/custom-response';
import { Slide, SlideDeleteType, SlideType, SlidesType } from '../model/slide';

const apiUrl = env.apiUrl + '/slide';

@Injectable({
  providedIn: 'root',
})
export class SlideService implements OnDestroy {
  slides$ = new BehaviorSubject<Slide[]>([]);
  slidesSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.slidesSubscription = this.getSlides().subscribe((response) => {
      this.slides$.next(response.data.slides);
    });
  }

  getSlides = (): Observable<CustomResponse<SlidesType>> => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    this.http.get<CustomResponse<SlidesType>>(apiUrl + '/list');
    return this.http.get<CustomResponse<SlidesType>>(
      apiUrl + '/list',
      requestOptions
    );
  };

  save(
    imageFile: File,
    productId: number
  ): Observable<CustomResponse<SlideType>> {
    const imageFormData = new FormData();
    imageFormData.append('imageFile', imageFile, imageFile.name);
    imageFormData.append('productId', productId.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.post<CustomResponse<SlideType>>(
      apiUrl + '/save',
      imageFormData,
      requestOptions
    );
  }

  delete(imageId: number): Observable<CustomResponse<SlideDeleteType>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.delete<CustomResponse<SlideDeleteType>>(
      apiUrl + '/delete/' + imageId,
      requestOptions
    );
  }

  ngOnDestroy(): void {
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
  }
}
