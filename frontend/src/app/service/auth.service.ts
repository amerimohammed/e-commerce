import { Injectable } from '@angular/core';
import { Credentials, SignUp, User, UserType } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomResponse } from '../model/custom-response';
import { env } from 'src/environments/environment';

const url = env.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {}

  register(user: SignUp): Observable<CustomResponse<UserType>> {
    return this.http.post<CustomResponse<UserType>>(url + '/register', user);
  }

  login(user: Credentials): Observable<CustomResponse<UserType>> {
    return this.http.post<CustomResponse<UserType>>(url + '/login', user);
  }
}
