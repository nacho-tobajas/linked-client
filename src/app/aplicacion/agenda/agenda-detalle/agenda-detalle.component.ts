import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model.js';
import { environment } from 'src/environments/environment.js';

@Component({
  selector: 'app-agenda-detalle',
  standalone: false,
  templateUrl: './agenda-detalle.component.html',
  styleUrl: './agenda-detalle.component.scss'
})
export class AgendaDetalleComponent {
  environmentImg = environment.urlImg;
  mensajeRespuesta: string = '';

  constructor(
    public dialogRef: MatDialogRef<AgendaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { turno: TurnoSesion }
  ) {}

  cerrar(accion: 'cancelar' | 'confirmar' | 'rechazar' | 'completar' | null) {
    if (accion === null) {
      this.dialogRef.close();
      return;
    }

    this.dialogRef.close({
      action: accion,
      message: this.mensajeRespuesta,
      turnoId: this.data.turno.id
    });
  }

  public openImageUrl(imagePath: string): void {
  const fullUrl = this.environmentImg + imagePath; 
  window.open(fullUrl, '_blank');
}
}



