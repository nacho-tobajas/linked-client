import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/services/auth/encryption.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { ForgotPasswordService } from 'src/app/services/auth/forgotpass.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-forgot-pass',
    templateUrl: './forgotPass.component.html',
    styleUrls: ['./forgotPass.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, NgIf, MatError, MatCardActions, MatButton]
})
export class ForgotPassComponent implements OnInit {
  forgotPassForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService,
    private ForgotPasswordService: ForgotPasswordService
  ) {
    this.forgotPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  get emailControl() {
    return this.forgotPassForm.get('email');
  }

  forgotPass() {
    if (this.forgotPassForm.valid) {
      this.email = this.forgotPassForm.value.email;
      this.ForgotPasswordService.forgotPassword(this.email).subscribe({
        next: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              type: 'success',
              message: 'Se ha enviado un correo para recuperar la contraseña.'
            }
          });
          this.router.navigateByUrl('/login');
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              type: 'error',
              message: 'Error al enviar la solicitud de recuperación de contraseña.'
            }
          });
        }
      });
    }
  }
}