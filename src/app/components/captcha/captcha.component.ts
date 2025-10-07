
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha-angular19';

@Component({
  selector: 'app-captcha',
  standalone:false,
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
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
