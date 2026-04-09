import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { SolicitudTatuadorService, SolicitudTatuador } from 'src/app/services/solicitud-tatuador/solicitud-tatuador.service';
import { EspecialidadesService } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.service';
import { Especialidad } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-solicitudes-tatuador',
  templateUrl: './solicitudes-tatuador.component.html',
  styleUrls: ['./solicitudes-tatuador.component.scss'],
  imports: [NgFor, NgIf, DatePipe, MatIcon, MatButton, MatIconButton, MatTooltip],
})
export class SolicitudesTatuadorComponent implements OnInit {
  solicitudes: SolicitudTatuador[] = [];
  especialidadesMap: Map<number, string> = new Map();
  loading = true;

  constructor(
    private service: SolicitudTatuadorService,
    private espService: EspecialidadesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.espService.getAllEspecialidades().subscribe((esps: Especialidad[]) => {
      esps.forEach(e => this.especialidadesMap.set(e.id, e.nombre));
      this.loadSolicitudes();
    });
  }

  loadSolicitudes(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  get pendientes(): SolicitudTatuador[] {
    return this.solicitudes.filter(s => s.status === 'pendiente');
  }

  get procesadas(): SolicitudTatuador[] {
    return this.solicitudes.filter(s => s.status !== 'pendiente');
  }

  getNombresEspecialidades(ids: number[]): string {
    if (!ids?.length) return '—';
    return ids.map(id => this.especialidadesMap.get(id) ?? `#${id}`).join(', ');
  }

  aprobar(sol: SolicitudTatuador): void {
    this.service.aprobar(sol.id).subscribe({
      next: () => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: `Solicitud de ${sol.user.username} aprobada`, type: 'success' }
        });
        this.loadSolicitudes();
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error?.message || 'Error al aprobar', type: 'error' }
        });
      }
    });
  }

  rechazar(sol: SolicitudTatuador): void {
    this.service.rechazar(sol.id).subscribe({
      next: () => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: `Solicitud de ${sol.user.username} rechazada`, type: 'error' }
        });
        this.loadSolicitudes();
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error?.message || 'Error al rechazar', type: 'error' }
        });
      }
    });
  }
}
