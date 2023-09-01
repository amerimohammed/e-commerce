import { Injectable } from '@angular/core';
import { CustomResponse } from '../model/custom-response';
import { User, UserDeleteType, UserType, UsersType } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const apiUrl = env.apiUrl + '/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers = (): Observable<CustomResponse<UsersType>> => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    this.http.get<CustomResponse<UsersType>>(apiUrl + '/list');
    return this.http.get<CustomResponse<UsersType>>(
      apiUrl + '/list',
      requestOptions
    );
  };

  updateUser = (user: User): Observable<CustomResponse<UserType>> => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.patch<CustomResponse<UserType>>(
      apiUrl + '/update',
      user,
      requestOptions
    );
  };

  deleteUser = (userId: number): Observable<CustomResponse<UserDeleteType>> => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
    });
    const requestOptions = { headers: headers };

    return this.http.delete<CustomResponse<UserDeleteType>>(
      apiUrl + '/delete/' + userId,
      requestOptions
    );
  };
}
