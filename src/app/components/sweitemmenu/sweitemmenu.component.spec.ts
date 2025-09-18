import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { SweItemMenuComponent } from './sweitemmenu.component';

describe('SidemenuComponent', () => {
  let component: SweItemMenuComponent;
  let fixture: ComponentFixture<SweItemMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SweItemMenuComponent],
      imports: [
        FormsModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterOutlet
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(SweItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
