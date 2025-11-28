import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
  standalone: false
})
export class ReservaComponent{
  constructor( private router: Router){}

  iniciarReserva(): void {
    this.router.navigate(['/reserva/listado']);
  }

  irAMisReservas(): void {
    this.router.navigate(['/mis-reservas']);
  }
  }

