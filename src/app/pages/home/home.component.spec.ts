import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { JuegoListComponent } from 'src/app/aplicacion/juegos/juego-list/juego-list.component';
import { JuegosComponent } from 'src/app/aplicacion/juegos/juegos.component';
import { HomeComponent } from './home.component';
import { Juego } from 'src/app/aplicacion/juegos/juegos.model';
import { JuegosPorCategoriaComponent } from 'src/app/aplicacion/juegos/juegos-por-categoria/juegos-por-categoria.component';
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, JuegosComponent, JuegoListComponent, JuegosPorCategoriaComponent, CarouselComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
