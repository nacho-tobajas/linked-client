import { Component } from '@angular/core';

interface Reserva {
  id: number;
  nombre: string;
  fecha: string;
  imagen: string;
}

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrl: './confirmar-reserva.component.scss',
  standalone: false
})
export class ConfirmarReservaComponent {
  nombreUsuario = 'Resevas Pendientes';
  step: 'listado'|'horarios' |'confirmacion' = 'listado';
  selectedTatuador: Reserva | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';

  reservas: Reserva[] = [
    {
      id: 23122,
      nombre: 'Carlos Mendoza',
      fecha: '20/10/2025',
      imagen: 'https://images.stockcake.com/public/4/2/2/42261aeb-672e-4755-9ca7-8b8f101238ed_medium/geometric-tattoo-patterns-stockcake.jpg'
    },
    {
      id: 24326,
      nombre: 'Ana Rodríguez',
      fecha: '20/10/2025',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpB36mdrQEMHCQxaUcSGExxRMJvEZKQLu47g&s'
    },
    {
      id: 24343,
      nombre: 'Miguel Torres',
      fecha: '20/10/2025',
      imagen: 'https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2010/6/1/218/20160315053236c24cd76e1ce41366a4bbe8a49b02a028.jpg'
    },

  ];

  horarios: string[] = [
    'Aceptar', 'Rechazar'
  ];

  goToListado(): void {
    this.step = 'listado';
  }

  selectTatuador(tatuador: Reserva): void {
    this.selectedTatuador = tatuador;
    this.step = 'horarios';
  }

  goBack(): void {
     if (this.step === 'horarios') {
      this.step = 'listado';
    } 
     if (this.step === 'confirmacion') {
      this.step = 'listado';
    } 
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  confirmarReserva(): void {
     {
      this.step = 'confirmacion';
    }
  }

  volverInicio(): void {
    this.step = 'listado';
    this.selectedTatuador = null;
    this.selectedDate = null;
    this.selectedTime = '';
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  canConfirm(): boolean {
    return !!(this.selectedDate && this.selectedTime);
  }
}
