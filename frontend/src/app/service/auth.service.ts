import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Credentials, SignUp, User, UserType } from '../model/user';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomResponse } from '../model/custom-response';
import { env } from 'src/environments/environment';

const url = env.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  currentUser$ = new BehaviorSubject<User | null>(null);
  private currentUser: User | null = null;
  private currentUserSubscription: Subscription | undefined;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this.currentUser$.next(
        JSON.parse(<string>localStorage.getItem('currentUser'))
      );
    }
    this.currentUserSubscription = this.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  register(user: SignUp): Observable<CustomResponse<UserType>> {
    return this.http.post<CustomResponse<UserType>>(url + '/register', user);
  }

  login(user: Credentials): Observable<CustomResponse<UserType>> {
    return this.http.post<CustomResponse<UserType>>(url + '/login', user);
  }

  logout() {
    this.currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuth(): boolean {
    if (
      this.currentUser &&
      JSON.parse(atob(this.currentUser.token.split('.')[1])).exp * 1000 >
        new Date().getTime()
    ) {
      return true;
    }
    return false;
  }

  isAllowed = (allowedRoles: string[]): boolean => {
    let allowed = false;

    if (this.currentUser) {
      this.currentUser.roles.forEach((role) => {
        if (allowedRoles.includes(role)) {
          allowed = true;
          return;
        }
      });
    }

    return allowed;
  };
}
