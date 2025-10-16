import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialidad } from '../especialidades.model';

@Component({
  selector: 'app-especialidad-detail',
  standalone: false,
  templateUrl: './especialidad-detail.component.html',
  styleUrl: './especialidad-detail.component.scss'
})
export class EspecialidadDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<EspecialidadDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { especialidad: Especialidad }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

