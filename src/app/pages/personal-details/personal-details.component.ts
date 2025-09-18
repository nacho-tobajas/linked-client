import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  providers: [DatePipe],
  standalone: false
})
export class PersonalDetailsComponent implements OnInit {
  errorMessage: String = '';
  userId: number | null = null;
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  userRol: string | null = null;
  today: Date = new Date();
  private subscriptions: Subscription = new Subscription();

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control<string | null>(null),
    surname: this.formBuilder.control<string | null>(null,),
    realname: this.formBuilder.control<string | null>(null,),
    username: this.formBuilder.control<string | null>(null, Validators.required),
    email: this.formBuilder.control<string | null>(null, Validators.required),
    birth_date: this.formBuilder.control<Date | null>(null, Validators.required)
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el userId desde UserService
    this.userService.getUserId().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.loadUserData(this.userId);
      }
    });

    // Suscribirse al estado de userLoginOn
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!this.userLoginOn) {
          this.router.navigate(['/inicio']); // Redirige a la página de inicio si no está logueado
        }
      },
    });
  }

  loadUserData(userId: number) {
    // Reemplaza environment.userId con this.userId
    this.userService.getUser(userId).subscribe({
      next: (userData) => {
        this.user = userData;

        this.registerForm.controls.id.setValue(
          userData.idUser.toString() ?? ''
        );

        this.registerForm.controls.realname.setValue(this.user.realname ?? '');
        this.registerForm.controls.surname.setValue(this.user.surname ?? '');
        this.registerForm.controls.birth_date.setValue(
          this.user.birth_date ? new Date(this.user.birth_date) : null
        );
        this.registerForm.controls.username.setValue(this.user.username!);
        this.registerForm.controls.email.setValue(this.user.email!);

        this.loadUserRol();
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
    });

  }

  loadUserRol(): void {
    this.subscriptions.add(
      this.loginService.userRol.subscribe({
        next: (role) => {
          this.userRol = role; // Asigna el rol
        },
        error: (err) => {
          console.error('Error al obtener el rol del usuario', err);
        },
      })
    );
  }

  get realname() {
    return this.registerForm.controls.realname;
  }

  get surname() {
    return this.registerForm.controls.surname;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get birth_date() {
    return this.registerForm.controls.birth_date;
  }

  get username() {
    return this.registerForm.controls.username;
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid && this.userId) {
      this.userService
        .updateUser(this.userId, this.registerForm.value as unknown as User)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.user = this.registerForm.value as unknown as User;
            location.reload();
          },
          error: (errorData) => console.error(errorData),
        });
    }
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
