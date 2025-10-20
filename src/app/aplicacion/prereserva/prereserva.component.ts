import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Especialidad } from '../gestion-sistema/especialidades/especialidades.model';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.js';

interface prereserva {
  id: number;
  nombre: string;
  fecha: string;
  imagen: string;
  estado: string;
}

type Step = 'listado' | 'horarios' | 'confirmacion' | 'misreservas' | 'prereserva';
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

