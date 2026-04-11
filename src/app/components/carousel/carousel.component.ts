import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  environmentImg: string = '';
  selectedIndex = 0;
  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;

  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  ngOnInit() {
    if (this.autoSlide) {
      this.autoSlideJuegos();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval !== null) {
      clearInterval(this.autoSlideInterval);
    }
  }

  autoSlideJuegos(): void {
    this.autoSlideInterval = setInterval(() => {
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
