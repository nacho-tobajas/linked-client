import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLogged = loginService.isLoggedIn();

  if (!isLogged){
    router.navigate(['/inicio']);
    return false;
  }

  return true;
};
