import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmModel {
  title: string;
  message: string;
  notificationType?: string;
}

@Component({
    selector: 'app-confirm',
    styleUrls: ['./confirm.component.scss'],
    templateUrl: './confirm.component.html',
    standalone: false
})
export class ConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false); // Regresa false cuando se cancela
  }
}
