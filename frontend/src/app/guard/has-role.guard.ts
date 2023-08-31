import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(AuthService).getCurrentUser();
  if (
    currentUser &&
    inject(AuthService).isAllowed(route.data['allowedRoles'])
  ) {
    return true;
  }
  inject(Router).navigate(['/']);
  return false;
};
