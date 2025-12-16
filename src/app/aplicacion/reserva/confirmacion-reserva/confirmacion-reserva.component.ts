import { Component, OnInit } from '@angular/core';
import { Location, NgIf, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReservaStateService } from 'src/app/services/reserva/reserva-state.service';

@Component({
    selector: 'app-confirmacion-reserva',
    templateUrl: './confirmacion-reserva.component.html',
    styleUrl: './confirmacion-reserva.component.scss',
    imports: [NgIf, DatePipe]
})
export class ConfirmacionReservaComponent implements OnInit{
  reserva: any;

  constructor(
    private router: Router,
    private reservaStateService: ReservaStateService,
    private location: Location
  ){}

  ngOnInit(): void {  
    this.reserva = this.reservaStateService.getDatos();

    if (!this.reserva || !this.reserva.tatuador) {
      console.warn("No hay datos de reserva en el estado, redirigiendo.");
      this.router.navigate(['/reserva/listado']);
    }
  }

  goBack(): void {
    this.router.navigate(['/reserva/listado']); 
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']); 
  }
}