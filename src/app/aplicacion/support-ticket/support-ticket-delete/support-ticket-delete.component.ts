import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../../components/error-dialog/error-dialog.component';
import { SupportTicketService } from '../support-ticket.service';

@Component({
  selector: 'app-support-ticket-delete',
  templateUrl: './support-ticket-delete.component.html',
  styleUrls: ['./support-ticket-delete.component.scss'],
  standalone: false
})
export class SupportTicketDeleteComponent implements OnInit {
  supportTicketName: number = 0;
  successMessage: string | null = null;

  constructor(
    private supportTicketService: SupportTicketService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SupportTicketDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit(): void {
    this.supportTicketService.getSupportTicket(this.data.id).subscribe({
      next: (supportTicket) => {
        this.supportTicketName = supportTicket.id;
      },
      error: () => {
      },
    });
  }

  deleteSupportTicket(): void {
    this.supportTicketService.deleteSupportTicket(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'supportTicket eliminado satisfactoriamente';
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
