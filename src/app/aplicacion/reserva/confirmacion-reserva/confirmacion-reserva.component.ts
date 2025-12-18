import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReservaStateService } from 'src/app/services/reserva/reserva-state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ServerUrlPipe } from 'src/app/pipes/server-url.pipe';

@Component({
    selector: 'app-confirmacion-reserva',
    templateUrl: './confirmacion-reserva.component.html',
    styleUrl: './confirmacion-reserva.component.scss',
    imports: [ 
        DatePipe, 
        MatIconModule, 
        MatButtonModule, 
        ServerUrlPipe
    ]
})
export class ConfirmacionReservaComponent implements OnInit {
  reserva: any;

  constructor(
    private router: Router,
    private reservaStateService: ReservaStateService
  ) {}

  ngOnInit(): void {  
    this.reserva = this.reservaStateService.getDatos();

    if (!this.reserva || !this.reserva.tatuador) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/perfil/mis-turnos']); 
  }

  volverInicio(): void {
    this.router.navigate(['/']); 
  }
}