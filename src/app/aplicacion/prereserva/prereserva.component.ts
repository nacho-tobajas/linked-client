import { Component } from '@angular/core';

interface Tatuador {
  id: number;
  nombre: string;
  especialidad: string;
  imagen: string;
}

@Component({
  selector: 'app-prereserva',
  templateUrl: './prereserva.component.html',
  styleUrl: './prereserva.component.scss',
  standalone: false
})
export class PrereservaComponent {
  nombreUsuario = 'Linked';
  step: 'inicio' | 'listado' | 'horarios' | 'confirmacion' = 'inicio';
  selectedTatuador: Tatuador | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';

  tatuadores: Tatuador[] = [
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      especialidad: 'Realismo',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      nombre: 'Ana Rodríguez',
      especialidad: 'Geometría',
      imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      nombre: 'Miguel Torres',
      especialidad: 'Japonés',
      imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      especialidad: 'Acuarela',
      imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    }
  ];

  horarios: string[] = [
    '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00'
  ];

  goToListado(): void {
    this.step = 'listado';
  }

  selectTatuador(tatuador: Tatuador): void {
    this.selectedTatuador = tatuador;
    this.step = 'horarios';
  }

  goBack(): void {
    if (this.step === 'horarios') {
      this.step = 'listado';
      this.selectedDate = null;
      this.selectedTime = '';
    } else if (this.step === 'listado') {
      this.step = 'inicio';
    } else if (this.step === 'confirmacion') {
      this.step = 'inicio';
      this.selectedTatuador = null;
      this.selectedDate = null;
      this.selectedTime = '';
    }
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  confirmarReserva(): void {
    if (this.selectedDate && this.selectedTime && this.selectedTatuador) {
      this.step = 'confirmacion';
    }
  }

  volverInicio(): void {
    this.step = 'inicio';
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
