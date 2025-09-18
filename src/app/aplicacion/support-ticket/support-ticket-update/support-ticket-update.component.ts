import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { SupportTicket } from '../support-ticket.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

import { SupportTicketService } from '../support-ticket.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-support-ticket-update',
  templateUrl: './support-ticket-update.component.html',
  styleUrls: ['./support-ticket-update.component.scss'],
  standalone: false
})
export class SupportTicketUpdateComponent {
  supportTicket: SupportTicket;

  constructor(
    private supportTicketService: SupportTicketService,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SupportTicketUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supportTicket: SupportTicket }
  ) {
    // Inicializo el supportTicket con data del dialog
    this.supportTicket = { ...data.supportTicket };
  }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.supportTicket.modificationuser = username;
        this.supportTicket.modificationtimestamp = new Date().toISOString();
      }
    });
  }

  onUpdateSupportTicket() {
    const supportTicketToSend = {
      ...this.supportTicket,
      creationtimestamp: this.supportTicket.creationtimestamp
        ? new Date(this.supportTicket.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.supportTicket.modificationtimestamp
        ? new Date(this.supportTicket.modificationtimestamp).toISOString()
        : null,
    };

    this.supportTicketService
      .updateSupportTicket(this.supportTicket.id, supportTicketToSend)
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
