import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProximamenteService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarMensaje(): void {
    this.snackBar.open('¡Próximamente disponible!', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
