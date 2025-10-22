import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
interface prereserva {
  id: number;
  nombre: string;
  fecha: string;
  imagen: string;
  estado: string;
}
@Component({
  selector: 'app-prereserva',
  templateUrl: './prereserva.component.html',
  styleUrl: './prereserva.component.scss',
  standalone: false
})
export class PrereservaComponent{
  constructor( private router: Router){}

  iniciarPrereserva(): void {
    this.router.navigate(['/prereserva/listado']);
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

