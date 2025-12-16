import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SupportTicketCreateComponent } from 'src/app/aplicacion/support-ticket/support-ticket-create/support-ticket-create.component';
import { LoginService } from 'src/app/services/auth/login.service';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-soporte',
    templateUrl: './soporte.component.html',
    styleUrls: ['./soporte.component.scss'],
    imports: [MatIcon, MatDivider, MatButton]
})
export class SoporteComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SupportTicketCreateComponent, {
      width: '400px',
      disableClose: true,
    });

  }
}
