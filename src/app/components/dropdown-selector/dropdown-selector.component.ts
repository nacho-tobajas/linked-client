import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
    selector: 'app-dropdown-selector',
    templateUrl: './dropdown-selector.component.html',
    styleUrls: ['./dropdown-selector.component.scss'],
    imports: [MatFormField, MatLabel, NgIf, MatSelect, MatOption, NgFor]
})
export class DropdownSelectComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() multiple: boolean = false;

  @Input() valueSingle: string = '';
  @Output() valueSingleChange = new EventEmitter<string>();

  @Input() valueMultiple: string[] = [];
  @Output() valueMultipleChange = new EventEmitter<string[]>();

  @Input() placeholderAll: string = '';

  onValueChange(value: any) {
    if (this.multiple) {
      this.valueMultiple = value;
      this.valueMultipleChange.emit(value);
    } else {
      this.valueSingle = value;
      this.valueSingleChange.emit(value);
    }
  }
}
