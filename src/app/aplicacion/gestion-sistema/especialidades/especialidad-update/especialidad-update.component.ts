import { Component, Inject } from '@angular/core';
import { EspecialidadesService } from '../especialidades.service';
import { Especialidad } from '../especialidades.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component.js';

@Component({
  selector: 'app-especialidad-update',
  standalone: false,
  templateUrl: './especialidad-update.component.html',
  styleUrl: './especialidad-update.component.scss'
})
export class EspecialidadUpdateComponent {
especialidad: Especialidad;

  constructor(
    private especialidadesService: EspecialidadesService,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EspecialidadUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { especialidad: Especialidad
     }
  ) {
    // Inicializo la especialidad con data del dialog
    this.especialidad = { ...data.especialidad };
  }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.especialidad.modificationuser = username;
        this.especialidad.modificationtimestamp = new Date().toISOString();
      }
    });
  }

  onUpdateEspecialidad() {
    const especialidadToSend = {
      ...this.especialidad,
      creationtimestamp: this.especialidad.creationtimestamp
        ? new Date(this.especialidad.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.especialidad.modificationtimestamp
        ? new Date(this.especialidad.modificationtimestamp).toISOString()
        : null,
    };

    this.especialidadesService
      .updateEspecialidad(this.especialidad.id, especialidadToSend)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          const errorMessage = error?.error?.msg || 'Ocurrió un error';
          this.showErrorDialog(errorMessage);
        },
      });
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title: 'Error', message, type: 'error' },
      width: '400px',
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
