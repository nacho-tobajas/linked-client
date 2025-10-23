import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TatuajeImagen } from 'src/app/models/tatuador/tatuador.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imagenes-trabajos-list',
  templateUrl: './imagenes-trabajos-list.component.html',
  styleUrl: './imagenes-trabajos-list.component.scss'
})
export class ImagenesTrabajosListComponent {

  environmentImg: string = "";
  @Input() tatuajes: TatuajeImagen[] = [];
  @Input() isLoggedIn: boolean = false;
  @Input() isFavcorite: boolean = false;
  @Input() isLibrary: boolean = false;
  @Output() tatuajeSelected = new EventEmitter<number>();
  @Output() favoriteToggled = new EventEmitter<TatuajeImagen>();
  @Output() removeFromFavorites = new EventEmitter<number>();

  ngOnInit(): void {
    this.environmentImg = environment.urlImg;
  }

  onGameClick(tatuajeId: number): void {
    this.tatuajeSelected.emit(tatuajeId);
  }
}



