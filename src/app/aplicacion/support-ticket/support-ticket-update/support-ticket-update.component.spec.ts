import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SupportTicketUpdateComponent } from './support-ticket-update.component';
import { MatCardModule } from '@angular/material/card';

describe('SupportTicketUpdateComponent', () => {
  let component: SupportTicketUpdateComponent;
  let fixture: ComponentFixture<SupportTicketUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportTicketUpdateComponent],
      imports: [MatDialogModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule, MatSelectModule, FormsModule, MatCardModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(SupportTicketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
