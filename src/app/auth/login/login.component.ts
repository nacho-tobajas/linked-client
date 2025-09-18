import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../models/loginRequest';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EncryptionService } from 'src/app/services/auth/encryption.service';
import { ProximamenteService } from 'src/app/services/proximamente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  hide = true; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService,
    private proximamenteService: ProximamenteService,
    private encryptionService: EncryptionService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], //Validadores requeridos
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  get username() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get encryptedPassword() {
    return this.encryptionService.encrypt(this.passwordControl?.value || '');
  }

  login() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.username?.value,
        password: this.encryptedPassword
      };

      this.loginService.login(loginRequest).subscribe({
        next: (userData) => { },
        error: (errorData) => {
          this.showErrorDialog(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.showErrorDialog('Error al ingresar los datos.');
    }
  }

  showProximamente(): void {
    this.proximamenteService.mostrarMensaje();
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }
}
