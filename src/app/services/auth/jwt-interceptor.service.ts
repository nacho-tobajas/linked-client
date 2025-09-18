import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: String = this.loginService.userToken;
    const isAnonymousAllowed = req.url.includes('/supportTicket/create');

    if (token) {
      if (req.body instanceof FormData) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
                // NO seteamos Content-Type ni Accept, el navegador se encarga
              },
            });
          } else {
            req = req.clone({
              setHeaders: {
                'Content-Type': 'application/json;charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
          }
        }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if ((error.status === 401 || error.status === 403) && !isAnonymousAllowed) {
          this.dialog.closeAll(); // Cierra si quedaron abiertos
          // Si el token ha expirado o el usuario no está autorizado, redirige al inicio
          this.router.navigate(['/inicio']);
          this.loginService.logout(); // Limpia el token y cualquier sesión del usuario
        }
        return throwError(error);
      })
    );
  }
}
