import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
  standalone: false
})
export class ReservaComponent{
  constructor( private router: Router){}

  iniciarReserva(): void {
    this.router.navigate(['/reserva/listado']);
  }

  irAMisReservas(): void {
    this.router.navigate(['/mis-reservas']);
  }

/*
  // --- Lógica: Navegación General ---
  goBack(): void {
    if (this.step === 'horarios') {
      this.step = 'listado';
      this.selectedTatuadorId = null; 
      this.selectedDate = null;
      this.selectedTime = '';
      this.selectedFiles = [];
      this.previewImages = [];
    } else if (this.step === 'listado') {
      this.flowClosed.emit(); // Avisa al padre que cierre
    } else if (this.step === 'confirmacion') {
      this.step = 'horarios'; // Vuelve a horarios
    }
    else if (this.step === 'misreservas') {
      this.flowClosed.emit(); // Avisa al padre que cierre
    }
    else if (this.step === 'prereserva') {
      this.step = 'misreservas';
    }
  }

  volverInicio(): void {
    this.flowClosed.emit(); // Avisa al padre que cierre
    // Limpiamos todo al salir
    this.selectedTatuadorId = null;
    this.selectedDate = null;
    this.selectedTime = '';
    this.selectedFiles = [];
    this.previewImages = [];
  }
*/
  }

