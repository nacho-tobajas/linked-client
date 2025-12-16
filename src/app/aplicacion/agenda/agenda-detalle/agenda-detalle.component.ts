import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { environment } from 'src/environments/environment';
import { EditarTurnoComponent } from '../editar-turno/editar-turno.component.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agenda-detalle',
  standalone: false,
  templateUrl: './agenda-detalle.component.html',
  styleUrl: './agenda-detalle.component.scss'
})
export class AgendaDetalleComponent implements OnInit{
  environmentImg = environment.urlImg;
  mensajeRespuesta: string = '';
  mensajes: any[] = [];
  nuevoMensajeText: string = ''; 
  currentUserId!: number;

  huboCambiosManuales = false;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AgendaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { turno: TurnoSesion },
    private turnosService: TurnosService, 
    private authService: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.currentUserId = this.authService.getCurrentUserId() || 0; 
    this.cargarMensajes(); 
  }

  abrirEdicion(): void {
    const dialogEdit = this.dialog.open(EditarTurnoComponent, {
        width: '400px',
        data: { turno: this.data.turno } // Pasamos el turno actual
    });

    dialogEdit.afterClosed().subscribe(result => {
        if (result) {
            // Si guardó cambios en el modal de edición:
            this.actualizarTurnoManual(result);
        }
    });
  }

  actualizarTurnoManual(datosNuevos: any): void {
      this.turnosService.updateTurno(this.data.turno.id!, datosNuevos).subscribe({
          next: (turnoActualizado) => {
              this.data.turno = turnoActualizado; 
              this.huboCambiosManuales = true;
              this.snackBar.open('Turno actualizado correctamente.', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
              console.error(err);
              const mensajeError = err.error?.message || 'Ocurrió un error inesperado.';
              if (err.status === 409) {
                  this.snackBar.open('⚠️ El horario elegido se superpone con otro turno.', 'Entendido', { 
                      duration: 5000, 
                      panelClass: ['error-snackbar'] 
                  });
              } else if (err.status === 400) {
                  // Errores de validación (ej: mover al pasado, tatuador no trabaja ese día)
                  this.snackBar.open(`⚠️ ${mensajeError}`, 'Cerrar', { duration: 5000 });
              } else {
                  this.snackBar.open('Ocurrió un error al actualizar.', 'Cerrar');
              }
          }
      });
  }

  cargarMensajes(): void {
    this.turnosService.getMensajesTurno(this.data.turno.id!).subscribe({
      next: (msgs: any) => {
        this.mensajes = msgs;
        //this.scrollToBottom(); // bajar al último mensaje - Desarrollar
      },
      error: (err: any) => {
        console.error("Error al cargar mensajes:", err);
        // Manejo de error
      }
    });
  }

  enviarMensaje(): void {
    if (!this.nuevoMensajeText.trim()) return;

    this.turnosService.enviarMensaje(this.data.turno.id!, this.nuevoMensajeText)
      .subscribe({
        next: (mensajeCreado: any) => {
          this.mensajes.push(mensajeCreado); // Agrega el mensaje a la lista local
          this.nuevoMensajeText = ''; // Limpia el input
          //this.scrollToBottom(); // bajar al último mensaje
        },
        error: (err: any) => {
          console.error("Error al enviar mensaje:", err);
          // Mostrar alerta
        }
      });
  }

  cerrar(accion: 'cancelar' | 'confirmar' | 'rechazar' | 'completar' | 'restaurar' | null) {

    if (accion === null) {
      this.dialogRef.close(this.huboCambiosManuales ? { action: 'refresh' } : null);
      return;
    }

    if (accion === 'restaurar') {
        this.dialogRef.close({
            action: 'restaurar', 
            turnoId: this.data.turno.id
        });
    } else {
        // Comportamiento normal
        this.dialogRef.close({
            action: accion,
            turnoId: this.data.turno.id
        });
    }
  }

  public openImageUrl(imagePath: string): void {
  const fullUrl = this.environmentImg + imagePath; 
  window.open(fullUrl, '_blank');
}
}



