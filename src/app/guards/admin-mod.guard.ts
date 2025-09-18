import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminModGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Verifico si el usuario es 'moderador' mapeando el observable
  return loginService.userRol.pipe(
    map((rol) => {
      if (rol === 'Moderador' || rol === 'Administrador' ) {
        return true; // Autorizo acceso
      } else {
        router.navigate(['/not-authorized']);
        return false;
      }
    })
  );
};
