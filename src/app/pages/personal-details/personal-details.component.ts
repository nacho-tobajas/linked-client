import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.js';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  providers: [DatePipe],
  standalone: false
})
export class PersonalDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  environment: string = '';
  errorMessage: string = '';
  userId: number | null = null;
  user?: User;
  environmentImg = environment.urlImg;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  userRol: string | null = null;
  today: Date = new Date();
  selectedFile: File | null = null;
  private subscriptions: Subscription = new Subscription();

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control<number | null>(null),
    surname: this.formBuilder.control<string | null>(null),
    realname: this.formBuilder.control<string | null>(null),
    username: this.formBuilder.control<string | null>(null, Validators.required),
    email: this.formBuilder.control<string | null>(null, Validators.required),
    birth_date: this.formBuilder.control<Date | null>(null, Validators.required),
    profileImage: this.formBuilder.control<File | null>(null) // campo para subir foto
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

    // Suscribirse al estado de login
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!this.userLoginOn) {
          this.router.navigate(['/inicio']);
        }
      },
    });
  }

  /** Manejo del archivo seleccionado */
 
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

      // 🔹 Validar tipo y tamaño
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxSizeMB = 2;

  if (!validTypes.includes(file.type)) {
    alert('Solo se permiten imágenes JPG o PNG.');
    return;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    alert(`El archivo excede el tamaño máximo (${maxSizeMB} MB).`);
    return;
  }

  this.selectedFile = file;

  // 🔹 Mostrar preview inmediatamente
  const reader = new FileReader();
  reader.onload = () => {
    if (this.user) {
      this.user.profile_photo = reader.result as string; // preview inmediata
    }
  };
  reader.readAsDataURL(file);

  // 🔹 Subir imagen sin recargar
  this.uploadProfileImage();
  }

  uploadProfileImage(): void {
    if (!this.selectedFile || !this.userId) return;

this.userService.updateProfilePhoto(this.userId, this.selectedFile).subscribe({
    next: (response) => {
      if (!this.user) return;

      // 🔹 Actualiza la URL del servidor + evita caché
      const updatedPhotoUrl = response.profile_photo
        ? `${this.environmentImg}${response.profile_photo}?v=${new Date().getTime()}`
        : this.user.profile_photo;

      // 🔹 Mantiene el preview actual hasta que se confirme la subida
      this.user.profile_photo = updatedPhotoUrl;

      // Limpia el input y archivo seleccionado
      this.selectedFile = null;
      this.fileInput.nativeElement.value = '';
    },
    error: (err) => {
      console.error('Error al actualizar imagen', err);
    }
  });
  }

  /** Carga los datos del usuario */
  loadUserData(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (userData) => {
        this.user = userData;

        this.registerForm.controls.id.setValue(userData.idUser ?? null);
        this.registerForm.controls.realname.setValue(userData.realname ?? '');
        this.registerForm.controls.surname.setValue(userData.surname ?? '');
        this.registerForm.controls.birth_date.setValue(
          userData.birth_date ? new Date(userData.birth_date) : null
        );
        this.registerForm.controls.username.setValue(userData.username ?? '');
        this.registerForm.controls.email.setValue(userData.email ?? '');

        this.loadUserRol();
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
    });
  }

  /** Carga el rol del usuario */
  loadUserRol(): void {
    this.subscriptions.add(
      this.loginService.userRol.subscribe({
        next: (role) => {
          this.userRol = role;
        },
        error: (err) => {
          console.error('Error al obtener el rol del usuario', err);
        },
      })
    );
  }

  /** Guarda los datos del formulario */
  savePersonalDetailsData() {
    if (this.registerForm.valid && this.userId) {
      const formData = new FormData();
      const userToSend: User = {
        ...this.user!,
        id: this.userId,
        idUser: this.userId,
        surname: this.registerForm.value.surname ?? '',
        realname: this.registerForm.value.realname ?? '',
        username: this.registerForm.value.username ?? '',
        email: this.registerForm.value.email ?? '',
        birth_date: this.registerForm.value.birth_date ?? undefined,
      };

      formData.append('user', JSON.stringify(userToSend));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.userService.updateUser(this.userId, formData).subscribe({
        next: () => {
          this.editMode = false;
          this.user = { ...this.user, ...userToSend };
        },
        error: (errorData) => console.error(errorData),
      });
  
    }
  }

  /** Formatea la fecha al escribir */
  onDateInput(event: any) {
    let value: string = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    event.target.value = value;
  }

  // Getters de conveniencia
  get realname() { return this.registerForm.controls.realname; }
  get surname() { return this.registerForm.controls.surname; }
  get email() { return this.registerForm.controls.email; }
  get birth_date() { return this.registerForm.controls.birth_date; }
  get username() { return this.registerForm.controls.username; }

}
