import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent {
  constructor(private router: Router) { }

  iniciarPrereserva(): void {

    this.router.navigate(['/prereserva/listado']);
  }

  goToMisReservas(): void {
    console.log("entro")
    this.router.navigate(['/mis-reservas']);
  }

}


