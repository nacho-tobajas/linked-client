import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trabajo } from 'src/app/models/trabajos/trabajos.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { TrabajosService } from 'src/app/services/trabajos/trabajos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent {

userLoginOn: boolean = false; // Estado de login
  feed: Trabajo[] = [];
  misLikes: Set<number> = new Set();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private trabajosService: TrabajosService
  ) { }

  ngOnInit(): void {
    console.log("entra")
    this.loginService.userLoginOn.subscribe(logged => {
      this.userLoginOn = logged;
      
      if (logged) {
        this.cargarMisLikes();
      } else {
        this.misLikes.clear(); 
      }
    });

    this.cargarFeed();
  }

  cargarFeed() {
    this.trabajosService.getFeed().subscribe({
      next: (data) => this.feed = data,
      error: (err) => console.error('Error cargando feed', err)
    });
  }

  cargarMisLikes() {
    this.trabajosService.getMisLikesIds().subscribe({
      next: (ids) => this.misLikes = new Set(ids)
    });
  }



  onToggleLike(trabajoId: number) {
    if (!this.userLoginOn) {
        alert("Debes iniciar sesión para dar Me Gusta.");
        this.router.navigate(['/login']); 
        return;
    }

    if (this.misLikes.has(trabajoId)) {
        this.misLikes.delete(trabajoId);
        this.trabajosService.quitarLike(trabajoId).subscribe();
    } else {
        this.misLikes.add(trabajoId);
        this.trabajosService.darLike(trabajoId).subscribe();
    }
  }
}


