import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrereservaComponent } from './prereserva.component';

describe('PrereservaComponent', () => {
  let component: PrereservaComponent;
  let fixture: ComponentFixture<PrereservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrereservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrereservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
