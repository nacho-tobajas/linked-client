import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EspecialidadesService } from '../especialidades.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
@Component({
  selector: 'app-especialidad-delete',
  standalone: false,
  templateUrl: './especialidad-delete.component.html',
  styleUrl: './especialidad-delete.component.scss'
})
export class EspecialidadDeleteComponent {
  especialidadName: string = '';
  successMessage: string | null = null;

  constructor(
    private especialidadService: EspecialidadesService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EspecialidadDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit(): void {
    this.especialidadService.getEspecialidad(this.data.id).subscribe({
      next: (especialidad) => {
        this.especialidadName = especialidad.nombre;
      },
      error: () => {
      },
    });
  }

  deleteEspecialidad(): void {
    this.especialidadService.deleteEspecialidad(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Especialidad eliminada satisfactoriamente';
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.msg || 'Ocurrió un error';
        this.showErrorDialog(errorMessage);
      },
    });
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
