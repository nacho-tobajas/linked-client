import { Component, Input } from '@angular/core';
import { Trabajo } from 'src/app/models/trabajos/trabajos.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { TrabajosService } from 'src/app/services/trabajos/trabajos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
@Input() tatuadorId!: number; // Recibe el ID del perfil que estamos viendo
  
  trabajos: Trabajo[] = [];
  misLikes: Set<number> = new Set(); // Usamos un Set para búsqueda rápida (O(1))
  environmentImg = environment.urlImg;
  
  esCliente = false; // Solo los clientes pueden dar like

  constructor(
    private trabajosService: TrabajosService,
    private loginService: LoginService // Asumo que tienes un servicio de auth
  ) {}

  ngOnInit(): void {
    this.checkRol();
    this.cargarTrabajos();
  }

  checkRol() {
    // Lógica para saber si el usuario logueado es Cliente
    // (Ajusta según tu LoginService)
    this.loginService.userRol.subscribe(rol => {
        this.esCliente = rol === 'Cliente';
        if (this.esCliente) {
            this.cargarMisLikes();
        }
    });
  }

  cargarTrabajos() {
    this.trabajosService.getTrabajosPorTatuador(this.tatuadorId).subscribe(data => {
      this.trabajos = data;
    });
  }

  cargarMisLikes() {
    this.trabajosService.getMisLikesIds().subscribe(ids => {
      this.misLikes = new Set(ids);
    });
  }

  toggleLike(trabajo: Trabajo) {
    if (!this.esCliente) return; // Tatuadores no se dan like a sí mismos

    const yaTieneLike = this.misLikes.has(trabajo.id);

    if (!trabajo.favoritos) trabajo.favoritos = [];
    // 1. UI Optimista (Cambiamos el corazón inmediatamente)
    if (yaTieneLike) {
        this.misLikes.delete(trabajo.id); // Apagar corazón
        trabajo.favoritos.pop();
        this.trabajosService.quitarLike(trabajo.id).subscribe({
            error: () => {
                // Si falla, revertimos
                this.misLikes.add(trabajo.id);
                trabajo.favoritos?.push({}); 
            }
        });
    } else {
        this.misLikes.add(trabajo.id); // Encender corazón
        trabajo.favoritos.push({ id: 0 });
        this.trabajosService.darLike(trabajo.id).subscribe({
            error: () => {
                // Si falla, revertimos
                this.misLikes.delete(trabajo.id);
                trabajo.favoritos?.pop();
            }
        });
    }
  }
}
