import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isAuth()) {
    return true;
  } else {
    authService.logout();
    inject(Router).navigate(['/']);
    return false;
  }
};
