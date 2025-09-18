import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/auth/register.service';
import { Validators } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { User } from '../auth.models';
import { EncryptionService } from 'src/app/services/auth/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = new User();
  today: Date = new Date();
  hide = true;


  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private dialog: MatDialog,
    private encryptionService: EncryptionService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        realname: [''],
        surname: [''],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordHasUpperCase(),
            this.passwordHasNumber()
          ],
        ],
        password2: ['', [Validators.required, this.passwordMatchValidator()]],
        birth_date: ['', [Validators.required]],
      }
    );

    this.user = new User();
  }

  ngOnInit(): void { }

  register() {
    this.user.surname = this.registerForm.controls['surname'].value;
    this.user.realname = this.registerForm.controls['realname'].value;
    this.user.username = this.registerForm.controls['username'].value;
    this.user.email = this.registerForm.controls['email'].value;
    this.user.creationuser = 'admin';
    this.user.creationtimestamp = new Date();
    this.user.modificationuser = 'admin';
    this.user.modificationtimestamp = new Date();
    this.user.status = true;
    this.user.password = this.encryptionService.encrypt(
      this.registerForm.controls['password'].value
    );
    this.user.birth_date = this.registerForm.controls['birth_date'].value;
    this.user.email = this.registerForm.controls['email'].value;
    this.registerService.register(this.user).subscribe(
      (data) => {
        this.showSuccessDialog();
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.dialog.closeAll;
        }, 2500);
      },
      (error) => {
        console.error('Error al registrar: ', error);
        this.showErrorDialog(error.error.error.message || 'Error desconocido');
      }
    );
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

  private showSuccessDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Registro exitoso', type: 'success' },
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) return null;

      const passwordControl = control.get('password');
      const confirmPasswordControl = control.get('password2');

      if (!passwordControl || !confirmPasswordControl) return null;

      const password = passwordControl.value;
      const confirm = confirmPasswordControl.value;

      const currentErrors = confirmPasswordControl.errors ? { ...confirmPasswordControl.errors } : {};

      if (password && confirm && password !== confirm) {
        currentErrors['passwordsMismatch'] = true;
        confirmPasswordControl.setErrors(currentErrors);
      } else {
        if (currentErrors['passwordsMismatch']) {
          delete currentErrors['passwordsMismatch'];
          confirmPasswordControl.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
        }
      }

      return null;
    };
  }

  get password2() {
    return this.registerForm.get('password2');
  }
  get password() {
    return this.registerForm.get('password');
  }

  onConfirmBlur() {
    this.password2?.markAsTouched();
    this.password2?.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  passwordHasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const hasNumber = /\d/.test(password); // Verifica si tiene al menos un número


      if (password && !hasNumber) {
        return {
          noNumber: 'La contraseña debe contener al menos un número.',
        };
      }


      return null;
    };
  }

  passwordHasUpperCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const hasUpperCase = /[A-Z]/.test(password); // Verifica si tiene al menos una mayúscula

      if (password && !hasUpperCase) {
        return {
          noUpperCase:
            'La contraseña debe contener al menos una letra mayúscula.',
        };
      }

      return null;
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;

      if (!email) {
        return null; // No validamos si está vacío, se usa Validators.required aparte
      }

      // Expresión regular simple para validar emails
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(email) ? null : { invalidEmail: true };
    };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onDateInput(event: any) {
    let value: string = event.target.value.replace(/\D/g, ''); // solo números
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    event.target.value = value;
  }
}
