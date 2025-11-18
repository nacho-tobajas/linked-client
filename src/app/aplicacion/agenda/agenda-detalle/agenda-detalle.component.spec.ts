import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDetalleComponent } from './agenda-detalle.component';

describe('AgendaDetalleComponent', () => {
  let component: AgendaDetalleComponent;
  let fixture: ComponentFixture<AgendaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
