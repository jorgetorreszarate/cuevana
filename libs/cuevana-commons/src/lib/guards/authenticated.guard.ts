import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = true;

  if (!isAuth) {
    router.navigateByUrl('/');
  }

  return isAuth;
}
