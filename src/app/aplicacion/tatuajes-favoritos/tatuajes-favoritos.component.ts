import { Component } from '@angular/core';
import { Trabajo } from 'src/app/models/trabajos/trabajos.model';
import { TrabajosService } from 'src/app/services/trabajos/trabajos.service';
import { PostTrabajoComponent } from 'src/app/components/post-trabajo/post-trabajo.component';
import { DetalleTrabajoComponent } from '../trabajos/detalle-trabajo/detalle-trabajo.component';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tatuajes-favoritos',
  imports: [NgIf, NgFor, PostTrabajoComponent],
  templateUrl: './tatuajes-favoritos.component.html',
  styleUrl: './tatuajes-favoritos.component.scss'
})
export class TatuajesFavoritosComponent {

  constructor(
    private trabajosService: TrabajosService,
    private dialog: MatDialog,
  ) { }

  trabajosFavoritos: Trabajo[] = [];
  favorites: Set<number> = new Set();

  ngOnInit(): void {
    this.cargarMisLikes();
  }

  async cargarMisLikes() {
    await this.trabajosService.getMisLikesIds().subscribe({
      next: (ids) => {
        this.favorites = new Set(ids);

        this.favorites.forEach(async id => {
          await this.trabajosService.getTrabajoById(id).subscribe({
            next: (trabajo) => {
              if (!this.trabajosFavoritos.some(t => t.id === trabajo.id)) {
                this.trabajosFavoritos.push(trabajo);
              }
            },
            error: () => console.error(`Error al cargar trabajo con ID ${id}`)
          });

        });
      }
    });
  }

  onToggleLike(trabajoId: number) {
    const trabajo = this.trabajosFavoritos.find(t => t.id === trabajoId);
    if (!trabajo) return;

    if (!trabajo.favoritos) trabajo.favoritos = [];

    const yaTieneLike = this.favorites.has(trabajoId);

    if (yaTieneLike) {
      this.favorites.delete(trabajoId);
      trabajo.favoritos.pop();

      this.trabajosService.quitarLike(trabajoId).subscribe({
        error: () => {
          this.favorites.add(trabajoId);
          trabajo.favoritos?.push({});
          console.error("Error al quitar like");
        }
      });

    } else {
      this.favorites.add(trabajoId);
      trabajo.favoritos.push({});
      this.trabajosService.darLike(trabajoId).subscribe({
        error: () => {
          this.favorites.delete(trabajoId);
          trabajo.favoritos?.pop();
          console.error("Error al dar like");
        }
      });
    }
  }

  abrirDetalle(trabajo: Trabajo) {
    const dialogRef = this.dialog.open(DetalleTrabajoComponent, {
      panelClass: 'custom-modal-panel',
      maxWidth: '100vw',
      maxHeight: '90vh',
      data: {
        trabajo: trabajo,
        isLiked: this.favorites.has(trabajo.id)
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Opcional: Recargar likes o feed al volver si hubo cambios drásticos
      // this.cargarMisLikes(); 
    });
  }

}
