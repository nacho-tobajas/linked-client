import { Component } from '@angular/core';
import { Reserva } from '../reserva/reserva.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mis-reservas',
  standalone:false,
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss'
})
export class MisReservasComponent {
  constructor(private location: Location){}

  reservas: Reserva[] = [ 
    { id: 1, nombre: 'Reserva Ejemplo', fecha: '20/10/2025', imagen: '', estado: 'Pendiente' } 
  ];
  selectedReserva: Reserva | null = null;
  cancelada = false;
  imagenPrevia: string | null = null;
  imagenSubida: boolean = false;

  goToPreReserva(reserva: Reserva): void {
    this.selectedReserva = reserva;
  }

  cancelarReserva(): void {
    if (!this.selectedReserva) return; 

    this.selectedReserva.estado = 'Cancelada';
    // (Aquí iría la llamada al servicio para cancelar)
    this.cancelada = true;
    setTimeout(() => {
      this.cancelada = false;
    }, 3000);
  }
  
  onImagenSeleccionada(event: Event): void {
    // Lógica para subir imagen en la pantalla de "prereserva" individual
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const archivo = input.files[0];
      const lector = new FileReader();
      lector.onload = (e: any) => {
        this.imagenPrevia = e.target.result;
        this.imagenSubida = true;
        setTimeout(() => (this.imagenSubida = false), 3000);
      };
      lector.readAsDataURL(archivo);
    }
  }
  
  goBack(): void {
    this.location.back(); 
  }
}
