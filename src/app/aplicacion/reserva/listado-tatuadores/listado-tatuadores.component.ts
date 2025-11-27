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
  
    // --- Lógica: Paso 1 (Listado) ---
    cargarTatuadores(): void {
      
      this.errorCarga = null;
      this.tatuadorService.getTatuadores().subscribe({
        next: (data: Tatuador[]) => { 
        const tatuadoresLimpios = data.map(tatuador => {

          tatuador.especialidades = tatuador.especialidades || []; 
          return tatuador;
        });

        this.tatuadores = tatuadoresLimpios;
        },
        error: (err) => {
          console.error('Error al cargar tatuadores:', err);
          this.errorCarga = 'No se pudieron cargar los tatuadores. Intenta más tarde.';
        }
      });
    }
  
    seleccionarTatuador(tatuador: Tatuador): void {
      this.selectedTatuadorId = tatuador.idUser;
    }
  
    verTrabajos(idTatuador: number, event: MouseEvent): void {
      event.stopPropagation(); // Evita que se dispare seleccionarTatuador()
      console.log("Navegando al portafolio de:", idTatuador);
      // this.router.navigate(['/portafolio', idTatuador]);
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
