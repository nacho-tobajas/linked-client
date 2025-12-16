import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SupportTicket } from '../support-ticket.model';
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-support-ticket-detail',
    templateUrl: './support-ticket-detail.component.html',
    styleUrls: ['./support-ticket-detail.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardAvatar, MatIcon, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButton, DatePipe]
})
export class SupportTicketDetailComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<SupportTicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supportTicket: SupportTicket }
  ) {}

  statusLabel!: string;

  ngOnInit(): void {
   const statusStr = this.data.supportTicket.status + '';
   this.statusLabel = statusStr === 'true' ? 'RESUELTO' : 'PENDIENTE';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
