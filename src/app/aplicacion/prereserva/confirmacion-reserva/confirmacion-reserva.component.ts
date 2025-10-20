import { Component, OnInit } from '@angular/core';
import { Prereserva } from '../prereserva.model';
import { Location } from '@angular/common';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { Router } from '@angular/router';
import { ReservaStateService } from 'src/app/services/prereserva/reserva-state.service';

@Component({
  selector: 'app-confirmacion-reserva',
  standalone: false,
  templateUrl: './confirmacion-reserva.component.html',
  styleUrl: './confirmacion-reserva.component.scss'
})
export class ConfirmacionReservaComponent implements OnInit{
  constructor(private router: Router,
              private reservaStateService: ReservaStateService,
              private location: Location
  ){}

  // --- Datos de Horarios (Esto es lo que estaba comentado) ---
  selectedTatuador: Tatuador | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  maxFiles = 3;
  // (Estos horarios deberían venir del backend más adelante)
  horarios: string[] = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  // --- Datos de "Mis Reservas" (Esto también estaba comentado) ---
  prereservas: Prereserva[] = [ 
    { id: 1, nombre: 'Reserva Ejemplo', fecha: '20/10/2025', imagen: '', estado: 'Pendiente' } 
  ];
  selectedprereserva: Prereserva | null = null;
  cancelada = false;
  imagenPrevia: string | null = null;
  imagenSubida: boolean = false;


  reserva: any;

  ngOnInit(): void {  
  this.reserva = this.reservaStateService.getDatos();
  if (!this.reserva.tatuador) {
      // Si no hay datos, es porque el usuario entró directo a la URL. Lo mandamos al inicio.
      this.router.navigate(['/prereserva/listado']);
  }
}

  goBack(): void {
    this.location.back(); 
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']); 
  }
}