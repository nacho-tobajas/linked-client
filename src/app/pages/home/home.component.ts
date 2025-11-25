import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubirTrabajoComponent } from 'src/app/aplicacion/trabajos/subir-trabajo/subir-trabajo/subir-trabajo.component';
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
  userRol: string | null = null;
  feed: Trabajo[] = [];
  misLikes: Set<number> = new Set();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private trabajosService: TrabajosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("entra")
    this.loginService.userLoginOn.subscribe(logged => {
      this.userLoginOn = logged;
    this.loginService.userRol.subscribe(rol => {
        this.userRol = rol;
    });
      
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

  abrirSubirTrabajo() {
    const dialogRef = this.dialog.open(SubirTrabajoComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si subió foto, recargamos el feed para que vea su propio post arriba
        this.cargarFeed();
      }
    });
  }
}


