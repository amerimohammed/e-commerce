import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginModalComponent } from 'src/app/layout/login-modal/login-modal';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  currentUserSubscription: Subscription | undefined;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  openModal() {
    const modalRef = this.modalService.open(LoginModalComponent, {
      scrollable: true,
    });
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (currentUser) => {
        this.currentUser = currentUser;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  hasRole = (allowedRoles: string[]): boolean => {
    return this.authService.isAllowed(allowedRoles);
  };

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
