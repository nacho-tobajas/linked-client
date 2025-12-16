import { Component } from '@angular/core';
import { Location, NgIf, NgFor, NgClass, UpperCasePipe, SlicePipe, DatePipe } from '@angular/common';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { AgendaDetalleComponent } from '../agenda/agenda-detalle/agenda-detalle.component';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ServerUrlPipe } from '../../pipes/server-url.pipe';

@Component({
    selector: 'app-mis-reservas',
    templateUrl: './mis-reservas.component.html',
    styleUrl: './mis-reservas.component.scss',
    imports: [MatIconButton, MatIcon, MatDivider, NgIf, MatProgressSpinner, MatButton, NgFor, MatCard, NgClass, MatCardContent, MatCardActions, RouterLink, UpperCasePipe, SlicePipe, DatePipe, ServerUrlPipe]
})
export class MisReservasComponent {
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
