
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha-angular19';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
    selector: 'app-captcha',
    templateUrl: './captcha.component.html',
    styleUrl: './captcha.component.scss',
    imports: [MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatIconButton, MatSuffix, MatIcon, NgIf, MatError, NgxCaptchaModule]
})


export class CaptchaComponent implements OnInit{
  num1!: number;
  num2!: number;
  captchaQuestion!: string;
  captchaControl = new FormControl('', Validators.required);

  @Output() captchaValid = new EventEmitter<boolean>();



  recaptchaService = inject(ReCaptchaV3Service);

  executeRecaptcha() {
    this.recaptchaService.execute('').subscribe((token)=>{
      console.log(token);
    })
  }

  executeRecaptchaVisible(token: any){
    console.log(token);
  }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
    this.captchaQuestion = `¿Cuánto es ${this.num1} + ${this.num2}?`;
    this.captchaControl.reset();
    this.captchaValid.emit(false);
  }

  validateCaptcha(): void {
    const answer = Number(this.captchaControl.value);
    if (answer === this.num1 + this.num2) {
      this.captchaValid.emit(true);
    } else {
      this.captchaValid.emit(false);
    }
  }
}
