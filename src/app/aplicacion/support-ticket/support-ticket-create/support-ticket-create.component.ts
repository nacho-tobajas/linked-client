import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { SupportTicket } from '../support-ticket.model';
import { SupportTicketService } from '../support-ticket.service';

import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-support-ticket-create',
  templateUrl: './support-ticket-create.component.html',
  styleUrls: ['./support-ticket-create.component.scss'],
  standalone: false
})
export class SupportTicketCreateComponent {
  supportTicket: SupportTicket = {
    id: 0,
    status: false,
    creationuser: '',
    creationtimestamp: new Date().toISOString(),
    modificationuser: '',
    modificationtimestamp: '',
    description: null,
  };
  constructor(
    private supportTicketService: SupportTicketService,
    private dialogRef: MatDialogRef<SupportTicketCreateComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe({
      next: (username) => {
        this.supportTicket.creationuser = username || 'Usuario Anonimo';
      },
      error: (err) => {
        console.error('Error obteniendo usuario logueado:', err);
        this.supportTicket.creationuser = 'Anonimo';
      },
    });
  }

  createSupportTicket(event?: Event): void {
    event?.preventDefault();

    //Validacion de fechas
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
      .createSupportTicket(
        supportTicketToSend,
      )

      .subscribe({
        next: (response) => {
          this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
          this.showSuccessDialog();
        },
        error: (error) => {
          console.error('Error creando supportTicket', error);
        },
      });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }

  private showSuccessDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Ticket creado exitosamente', type: 'success' },
    });
  }

  validaDescripcion(): boolean {

    const value = this.supportTicket.description as string;
    if (value && value.trim().length === 0) {
      return true; // error
    } else {
      return false; // válido
    }
  }
}
