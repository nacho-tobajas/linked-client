import { Component } from '@angular/core';
import { Especialidad } from '../especialidades.model';
import { EspecialidadesService } from '../especialidades.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { NoDoubleSubmitDirective } from 'src/app/shared/directives/no-double-submit.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-especialidad-create',
    templateUrl: './especialidad-create.component.html',
    styleUrl: './especialidad-create.component.scss',
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, FormsModule, MatFormField, MatLabel, MatInput, NgIf, MatIconButton, MatSuffix, MatIcon, MatError, MatCardActions, MatButton, NoDoubleSubmitDirective]
})
export class EspecialidadCreateComponent {
especialidad: Especialidad = {
    id: 0,
    nombre: '',
    descripcion: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: null,
    modificationuser: '',
    status: true,
  };
  constructor(
    private especialidadService: EspecialidadesService,
    private dialogRef: MatDialogRef<EspecialidadCreateComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.especialidad.creationuser = username;
      }
    });
  }

  createEspecialidad(): void {
    //Validacion de fechas
    const especialidadToSend = {
      ...this.especialidad,
      creationtimestamp: this.especialidad.creationtimestamp
        ? new Date(this.especialidad.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.especialidad.modificationtimestamp
        ? new Date(this.especialidad.modificationtimestamp).toISOString()
        : null,
    };

    this.especialidadService.createEspecialidad(especialidadToSend).subscribe({
      next: (response) => {
        this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
      },
      error: (error) => {
        console.error('Error creando especialidad', error);
      },
    });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
