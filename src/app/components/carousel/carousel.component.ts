import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    standalone: false
})
export class CarouselComponent implements OnInit{
  constructor(private router: Router) {}

  environmentImg: string="";
  selectedIndex = 0;

  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000; // 3 segundos

  ngOnInit(){
    if(this.autoSlide){
      this.autoSlideJuegos();
    }
    this.environmentImg = environment.urlImg;

  }

    autoSlideJuegos():void {
      setInterval(()=>{
        this.onNextClick();
      }, this.slideInterval);
    }
  
    //Setea el index de la imagen en el indicador
    selectGameImg(index: number): void {
      this.selectedIndex = index;
    }
  
    onPrevClick(): void {
/*       if(this.selectedIndex === 0){
        this.selectedIndex = this.juegos.length - 1;
      } else {
        this.selectedIndex--;
      } */
    }
  
    onNextClick(): void {
      /* if(this.selectedIndex === this.juegos.length - 1){
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      } */
    }

    verDetalle(juegoId: number) {
      this.router.navigate(['/juego', juegoId]);
    }


}
