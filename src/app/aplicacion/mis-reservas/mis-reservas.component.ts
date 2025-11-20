import { Component } from '@angular/core';
import { Reserva } from '../reserva/reserva.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { AgendaDetalleComponent } from '../agenda/agenda-detalle/agenda-detalle.component';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mis-reservas',
  standalone:false,
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss'
})
export class MisReservasComponent {
environmentImg = environment.urlImg;
  turnos: TurnoSesion[] = [];
  isLoading = false;
  errorCarga: string | null = null;

  constructor(
    private location: Location,
    private turnosService: TurnosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarMisReservas();
  }

  cargarMisReservas(): void {
    this.isLoading = true;
    this.errorCarga = null;

    this.turnosService.getMisTurnosCliente().subscribe({
      next: (data) => {
        this.turnos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorCarga = 'No se pudieron cargar tus reservas.';
        this.isLoading = false;
      }
    });
  }

  abrirDetalle(turno: TurnoSesion): void {
    const dialogRef = this.dialog.open(AgendaDetalleComponent, {
      width: '600px',
      data: { turno: turno }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.cargarMisReservas(); 
    });
  }
  
  goBack(): void {
    this.location.back(); 
  }
}
