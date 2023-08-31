import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';

import { SignUp, User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.css'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  isRegister = false;
  isRegister$ = new BehaviorSubject(false);
  isRegisterSubscription: Subscription | undefined;
  user: SignUp = this.initialize();
  currentUser: User | null = null;
  currentUserSubscription: Subscription | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isRegisterSubscription = this.isRegister$.subscribe((value) => {
      this.isRegister = value;
    });

    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (_user) => {
        this.currentUser = _user;
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  submit() {
    if (this.isRegister) {
      this.authService.register(this.user).subscribe((response) => {
        this.authService.currentUser$.next(response.data.user);
        this.closeModal('registered');
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      });
    } else {
      this.authService
        .login({ username: this.user.username, password: this.user.password })
        .subscribe((response) => {
          this.authService.currentUser$.next(response.data.user);
          this.closeModal('logged in');
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.data.user)
          );
        });
    }
  }

  initialize(): SignUp {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    };
  }
  changeModalState() {
    this.isRegister$.next(!this.isRegister);
  }

  ngOnDestroy(): void {
    if (this.isRegisterSubscription) {
      this.isRegisterSubscription.unsubscribe();
    }

    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
