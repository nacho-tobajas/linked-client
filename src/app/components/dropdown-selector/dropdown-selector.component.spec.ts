import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSelectComponent } from './dropdown-selector.component';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

describe('DropdownSelectorComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSelectComponent],
      imports:[MatFormField, MatLabel, MatSelect]
    });
    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
