import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Error desconocido!';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o red
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        // Mensajes backend
        errorMsg = error.error.message;
      } else {
        // Mensajes genéricos.
        switch (error.status) {
          case 0:
            errorMsg =
              'No se pudo conectar con el servidor. Verifique su conexión a internet.';
            break;
          case 400:
            errorMsg = 'Solicitud incorrecta. Formato inválido.';
            break;
          case 401:
            errorMsg = 'No autorizado. Por favor, inicie sesión.';
            break;
          case 403:
            errorMsg =
              'Prohibido. No tiene permisos para acceder a este recurso.';
            break;
          case 404:
            errorMsg =
              'Recurso no encontrado. Verifique la URL o el ID proporcionado.';
            break;
          case 500:
            errorMsg =
              'Error interno del servidor. Inténtelo nuevamente más tarde.';
            break;
          default:
            errorMsg = `Credenciales invalidas`;
            break;
        }
      }
    }

    // Devuelve un observable con un mensaje de error
    return throwError(() => new Error(errorMsg));
  }
}
