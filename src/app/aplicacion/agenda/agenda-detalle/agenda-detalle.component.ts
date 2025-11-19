import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agenda-detalle',
  standalone: false,
  templateUrl: './agenda-detalle.component.html',
  styleUrl: './agenda-detalle.component.scss'
})
export class AgendaDetalleComponent implements OnInit{
  environmentImg = environment.urlImg;
  mensajeRespuesta: string = '';
  mensajes: any[] = []; // 👈 Array para el chat
  nuevoMensajeText: string = ''; // 👈 NgModel para el input de chat
  currentUserId!: number;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AgendaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { turno: TurnoSesion },
    private turnosService: TurnosService, // 👈 Inyectado
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID del usuario logueado (necesario para el chat)
    //this.currentUserId = this.authService.getCurrentUserId() || 0; 
    
    // 2. Cargar los mensajes al inicio (o cuando se abra la pestaña)
    this.cargarMensajes(); 
  }

  cargarMensajes(): void {
    this.turnosService.getMensajesTurno(this.data.turno.id!).subscribe({
      next: (msgs: any) => {
        this.mensajes = msgs;
        //this.scrollToBottom(); // Opcional: bajar al último mensaje
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
          //this.scrollToBottom(); // Opcional: bajar al último mensaje
        },
        error: (err: any) => {
          console.error("Error al enviar mensaje:", err);
          // Mostrar alerta
        }
      });
  }

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



