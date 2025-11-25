import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Trabajo } from 'src/app/models/trabajos/trabajos.model';
import { environment } from 'src/environments/environment.js';

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

  environmentImg = environment.urlImg;

  constructor(private router: Router) {}

  onLikeClick(event: MouseEvent) {
    event.stopPropagation(); 
    this.toggleLike.emit(this.trabajo.id);
  }


  irAlPerfil() {
    if (this.trabajo.tatuador) {

      this.router.navigate(['/perfil-publico', this.trabajo.tatuador.id]);
    }
  }
}
