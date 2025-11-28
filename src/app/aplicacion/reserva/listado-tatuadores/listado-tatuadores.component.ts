import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
@Component({
  selector: 'app-listado-tatuadores',
  standalone: false,
  templateUrl: './listado-tatuadores.component.html',
  styleUrl: './listado-tatuadores.component.scss'
})
export class ListadoTatuadoresComponent {
  tatuadoresOriginal: Tatuador[] = [];
  tatuadores: Tatuador[] = [];

  selectedTatuadorId: number | null = null;
  errorCarga: string | null = null;

  constructor(
    private tatuadorService: TatuadorService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void{
    this.cargarTatuadores();
  }


  // --- Getters ---
    get selectedTatuador(): Tatuador | null {
      if (!this.selectedTatuadorId) return null;
      return this.tatuadores.find(t => t.idUser === this.selectedTatuadorId) || null;
    }
  
    cargarTatuadores(): void {
      
      this.errorCarga = null;
      this.tatuadorService.getTatuadores().subscribe({
        next: (data: Tatuador[]) => { 
        const tatuadoresLimpios = data.map(tatuador => {

          tatuador.especialidades = tatuador.especialidades || [];
          return tatuador;
        });

        this.tatuadoresOriginal = tatuadoresLimpios;
        this.tatuadores = tatuadoresLimpios;
        },
        error: (err) => {
          console.error('Error al cargar tatuadores:', err);
          this.errorCarga = 'No se pudieron cargar los tatuadores. Intenta más tarde.';
        }
      });
    }

    filtrar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase().trim();

    // Si el input está vacío, restauramos la lista completa
    if (!valor) {
        this.tatuadores = [...this.tatuadoresOriginal];
        return;
    }

    // Filtramos buscando en Nombre, Apellido, Usuario O Especialidades
    this.tatuadores = this.tatuadoresOriginal.filter(t => {
        const nombreCompleto = `${t.realname} ${t.surname}`.toLowerCase();
        const usuario = t.username?.toLowerCase() || '';
        
        // Convertimos las especialidades a un solo string para buscar fácil
        const especialidadesStr = t.especialidades?.map(e => e.nombre).join(' ').toLowerCase() || '';

        return nombreCompleto.includes(valor) || 
               usuario.includes(valor) ||
               especialidadesStr.includes(valor);
    });
  }
    
  
    seleccionarTatuador(tatuador: Tatuador): void {
      this.selectedTatuadorId = tatuador.idUser;
    }
  
    verTrabajos(idTatuador: number, event: MouseEvent): void {
      event.stopPropagation();
      this.router.navigate(['/perfil-publico', idTatuador]);
    }
  
    confirmarSeleccion(): void {
      if (this.selectedTatuadorId) {
        this.router.navigate(['/reserva/horarios', this.selectedTatuadorId]);
      }
    }

    goBack(): void {
    this.location.back(); 
  }
}
