import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { User } from 'src/app/auth/auth.models';
import { environment } from 'src/environments/environment';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }


  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.urlHost}users/reset-password`, { token, newPassword })
      .pipe(
        tap(() => {
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          throw error;
        })
      );
  }
}