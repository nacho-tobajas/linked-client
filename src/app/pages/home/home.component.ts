import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent {
  constructor(private router: Router) { }

  /*iniciarPrereserva(): void {

  this.router.navigate(['/reserva/listado']);
  }

  goToMisReservas(): void {
  this.router.navigate(['/mis-reservas']);
  }

  goToPortfolio():void{
  this.router.navigate(['/mis-reservas']);    
  }
*/
}


