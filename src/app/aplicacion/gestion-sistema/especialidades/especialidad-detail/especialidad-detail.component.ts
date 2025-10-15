import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Especialidad } from '../especialidades.model';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-especialidad-detail',
  imports: [MatCardModule],
  templateUrl: './especialidad-detail.component.html',
  styleUrl: './especialidad-detail.component.scss'
})
export class EspecialidadDetailComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<EspecialidadDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { especialdiad: Especialidad }
  ) {}

  statusLabel!: string;

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

