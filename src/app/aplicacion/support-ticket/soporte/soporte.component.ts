import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';

import { SupportTicket } from '../support-ticket.model';
import { SupportTicketService } from '../support-ticket.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss'],
  imports: [
    NgIf, NgFor, FormsModule,
    MatCard, MatCardContent, MatCardActions,
    MatFormField, MatLabel, MatHint,
    MatInput, MatSelect, MatOption,
    MatButton, MatIconButton, MatIcon, MatDivider, MatTooltip,
  ]
})
export class SoporteComponent implements OnInit {

  categorias = ['Bug / Error', 'Consulta general', 'Sugerencia de mejora', 'Reclamo', 'Otro'];
  prioridades = [
    { value: 'Baja',    label: 'Baja' },
    { value: 'Media',   label: 'Media' },
    { value: 'Alta',    label: 'Alta' },
    { value: 'Urgente', label: 'Urgente' },
  ];

  supportTicket: SupportTicket = new SupportTicket();
  screenshotPreview: string | null = null;
  screenshotError = '';
  isSending = false;
  sent = false;

  constructor(
    private supportTicketService: SupportTicketService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe({
      next: (username) => { this.supportTicket.creationuser = username || 'Anónimo'; },
      error: () => { this.supportTicket.creationuser = 'Anónimo'; },
    });

    this.supportTicket.url_pagina = window.location.href;
    this.supportTicket.user_agent = this.buildDeviceInfo();
  }

  private buildDeviceInfo(): string {
    const ua = navigator.userAgent;
    const platform = navigator.platform || '';
    const lang = navigator.language || '';
    const screenW = screen.width;
    const screenH = screen.height;
    return `${ua} | Platform: ${platform} | Lang: ${lang} | Screen: ${screenW}x${screenH}`;
  }

  onScreenshotSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.screenshotError = '';
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      this.screenshotError = 'La imagen no debe superar 1.5 MB.';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.screenshotPreview = e.target?.result as string;
      this.supportTicket.screenshot = this.screenshotPreview;
    };
    reader.readAsDataURL(file);
  }

  removeScreenshot(): void {
    this.screenshotPreview = null;
    this.supportTicket.screenshot = null;
  }

  isFormValid(): boolean {
    return !!this.supportTicket.description?.trim() &&
           !!this.supportTicket.category &&
           !!this.supportTicket.priority;
  }

  createSupportTicket(): void {
    if (!this.isFormValid() || this.isSending) return;

    this.isSending = true;
    const payload: SupportTicket = {
      ...this.supportTicket,
      creationtimestamp: new Date().toISOString(),
    };

    this.supportTicketService.createSupportTicket(payload).subscribe({
      next: () => {
        this.isSending = false;
        this.sent = true;
        this.supportTicket = new SupportTicket();
        this.screenshotPreview = null;
        this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Ticket creado exitosamente. Te responderemos a la brevedad.', type: 'success' },
        });
      },
      error: (err) => {
        this.isSending = false;
        console.error('Error creando ticket:', err);
      },
    });
  }
}
