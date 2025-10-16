import { Component } from '@angular/core';
import { Especialidad } from './especialidades.model';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadCreateComponent } from './especialidad-create/especialidad-create.component';
import { EspecialidadUpdateComponent } from './especialidad-update/especialidad-update.component';
import { EspecialidadDetailComponent } from './especialidad-detail/especialidad-detail.component';
import { EspecialidadDeleteComponent } from './especialidad-delete/especialidad-delete.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-especialidades',

  standalone: false,
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent {
  especialidades: Especialidad[] = [];
  constructor(
    private especialidadesService: EspecialidadesService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'desc', 'actions'];

  ngOnInit(): void {
    this.loadEspecialidadess();
    this.setupResponsiveColumns();
  }

  private setupResponsiveColumns(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // pantalla pequeña: oculto la columna 'desc'
        this.displayedColumns = ['id', 'nombre', 'actions'];
      } else {
        // pantalla grande: muestro todas
        this.displayedColumns = ['id', 'nombre', 'desc', 'actions'];
      }
    });
  }

  getCreateComponent() {
    return EspecialidadCreateComponent;
  }
  getEditComponent() {
    return EspecialidadUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EspecialidadCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEspecialidadess(); // Carga o actualiza la lista de Especialidadess
      }
    });
  }

  showDetails(id: number): void {
    this.especialidadesService
      .getEspecialidad(id)
      .subscribe((especialidad) => {
        const dialogRef = this.dialog.open(EspecialidadDetailComponent, {
          width: '400px',
          disableClose: true,
          data: { especialidad },
        });
      });
  }

  openEditDialog(id: number): void {
    this.especialidadesService
      .getEspecialidad(id)
      .subscribe((especialidad) => {
        const dialogRef = this.dialog.open(EspecialidadUpdateComponent, {
          width: '400px',
          disableClose: true,
          data: { especialidad },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadEspecialidadess(); // Carga o actualiza la lista de Especialidadess
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(EspecialidadDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEspecialidadess(); // Carga o actualiza la lista de Especialidadess
      }
    });
  }

  loadEspecialidadess(): void {
    this.especialidadesService.getAllEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

}
