import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { NavComponent } from './nav.component';

@Component({ selector: 'app-help-dialog', template: '' })
class MockHelpDialogComponent {}

class MockLoginService {
  userLoginOn = of(false);
  userRol = of(null);
  logout = jasmine.createSpy('logout');
}
class MockUserService {
  getLoggedInUsername = () => of('UsuarioTest');
}
class MockProximamenteService {
  mostrarMensaje = jasmine.createSpy('mostrarMensaje');
}

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule
      ],
      providers: [
        { provide: 'LoginService', useClass: MockLoginService },
        { provide: 'UserService', useClass: MockUserService },
        { provide: 'ProximamenteService', useClass: MockProximamenteService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menuOpen when toggleMenu() is called', () => {
  expect(component.menuOpen).toBeFalse(); // Estado inicial
  component.toggleMenu();
  expect(component.menuOpen).toBeTrue();  // Cambia
  component.toggleMenu();
  expect(component.menuOpen).toBeFalse(); // Vuelve a cerrar
});

});