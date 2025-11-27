import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Trabajo } from 'src/app/models/trabajos/trabajos.model';
@Component({
  selector: 'app-post-trabajo',
  standalone: false,
  templateUrl: './post-trabajo.component.html',
  styleUrl: './post-trabajo.component.scss'
})
export class PostTrabajoComponent {
  @Input() trabajo!: Trabajo;
  @Input() isLiked: boolean = false;
  @Input() showArtistInfo: boolean = true; // True en Home, False en Perfil del Tatuador
  
  @Output() toggleLike = new EventEmitter<number>(); 

  currentImageIndex: number = 0;

  constructor(private router: Router) {}

  nextImage(event: MouseEvent) {
    event.stopPropagation(); 
    if (!this.trabajo.fotos) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.trabajo.fotos.length;
  }

  prevImage(event: MouseEvent) {
    event.stopPropagation();
    if (!this.trabajo.fotos) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.trabajo.fotos.length) % this.trabajo.fotos.length;
  }

  onLike(event: MouseEvent) {
    event.stopPropagation(); 
    this.toggleLike.emit(this.trabajo.id);
  }


  irAlPerfil(event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.trabajo.tatuador) {
      this.router.navigate(['/perfil-publico', this.trabajo.tatuador.id]);
    }
  }
}
