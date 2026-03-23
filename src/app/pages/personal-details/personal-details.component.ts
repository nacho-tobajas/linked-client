import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Especialidad } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.model';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
import { TatuadorComponent } from './tatuador/tatuador.component';
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { ServerUrlPipe } from '../../pipes/server-url.pipe';


@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],
    providers: [DatePipe],
    imports: [MatChipsModule,NgIf, MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatDivider, MatCardContent, NgFor, MatChip, MatCardActions, MatIcon, RouterLink, MatIconButton, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, TatuadorComponent, MatButton, DatePipe, ServerUrlPipe]
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild(TatuadorComponent) tatuadorComponentRef!: TatuadorComponent;

  previewImageUrl: string | ArrayBuffer | null = null;
  environment: string = '';
  errorMessage: string = '';
  userId: number | null = null;
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  userRol: string | null = null;
  especialidades: Especialidad[] = [];
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
    private tatuadorService : TatuadorService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserSession();
    this.watchLoginState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadUserSession(): void {
    this.userService.getUserId().subscribe((id) => {
      this.userId = id;
      if (id) this.loadUserData(id);
    });
  }

  private watchLoginState(): void {
    this.subscriptions.add(
      this.loginService.userLoginOn.subscribe((logged) => {
        this.userLoginOn = logged;
        if (!logged) this.router.navigate(['/inicio']);
      })
    );
  }

  // ----------------------------------------------------------
  // Cargar datos del usuario
  // ----------------------------------------------------------
  private loadUserData(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
        this.registerForm.patchValue({
          surname: data.surname ?? '',
          realname: data.realname ?? '',
          username: data.username ?? '',
          email: data.email ?? '',
          birth_date: data.birth_date ? new Date(data.birth_date) : null,
        });
        this.loadUserRol();
        this.loadEspecialidades();
      },
      error: (err) => (this.errorMessage = err?.message || 'Error al cargar datos'),
    });
  }

  private loadEspecialidades(): void {
  if (!this.userId || !this.user) {
    console.warn("Intentando cargar especialidades sin userId o sin objeto user inicializado.");
    return;
  }

  this.tatuadorService.getEspecialidadesTatuador(this.userId).subscribe({
      next: (res) => {
        if (this.user) { 
            this.user.especialidades = res;
        }
      },
      error: (err) => {
          console.error("Error al cargar especialidades del tatuador:", err);
          if(this.user) {
              this.user.especialidades = [];
          }
      }
  });
  }

  private loadUserRol(): void {
    this.subscriptions.add(
      this.loginService.userRol.subscribe({
        next: (role) => (this.userRol = role),
        error: (err) => console.error('Error al obtener el rol', err),
      })
    );
  }

  /** Manejo del archivo seleccionado */
 
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
  const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeMB = 3;

    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Solo se permiten imágenes JPG, PNG o WEBP.';
      this.previewImageUrl = null;
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      this.errorMessage = `El archivo no puede superar ${maxSizeMB}MB.`;
      this.previewImageUrl = null;
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';

    // Vista previa
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // ----------------------------------------------------------
  // Guardar cambios (todos los endpoints)
  // ----------------------------------------------------------

  especialidadesSeleccionadas: number[] = [];

  onEspecialidadesChange(especialidades: Especialidad[]): void {
    this.especialidadesSeleccionadas = especialidades.map(e => e.id);
  }

  onUpdateProfile(): void {
  if (!this.userId || !this.user) {
    return;
  }

  if (this.registerForm.invalid) {
    return;
  }

    const requests = [];

    // 1. Actualizar datos del usuario
  const formValues = this.registerForm.value;

  let tatuadorData: { estudio?: string | null, fecha_inicio_actividad?: Date | null } = {
    estudio: undefined,
    fecha_inicio_actividad: undefined
    };

    if (this.userRol === 'Tatuador' && this.tatuadorComponentRef) {
        tatuadorData = this.tatuadorComponentRef.getTatuadorData();
    }

  const updatedUser: Partial<User> = {
    ...this.user,
    realname: formValues.realname ?? undefined,
    surname: formValues.surname ?? undefined,
    username: formValues.username ?? undefined,
    email: formValues.email ?? undefined,
    birth_date: formValues.birth_date
      ? new Date(formValues.birth_date)
      : undefined,
    estudio: tatuadorData.estudio ?? undefined ,
    fecha_inicio_actividad: tatuadorData.fecha_inicio_actividad ? new Date(tatuadorData.fecha_inicio_actividad) : undefined
  };

    requests.push(this.userService.updateUser(this.userId, updatedUser));

    // 2. Subir imagen si hay nueva
    if (this.selectedFile) {
      requests.push(this.userService.updateProfilePhoto(this.userId, this.selectedFile));
    }

    //  3. Si es tatuador, actualizar especialidades
if (this.userRol === 'Tatuador' && this.especialidadesSeleccionadas.length >= 0) {
  requests.push(
      this.tatuadorService.assignEspecialidades(this.userId, this.especialidadesSeleccionadas)
    );
  }

    //  Ejecutar todas las llamadas juntas
    forkJoin(requests).subscribe({
      next: (responses) => {
        this.editMode = false;
        this.selectedFile = null;
        this.fileInput.nativeElement.value = '';
        this.previewImageUrl = null;
        
        if (this.userId) {
        this.loadUserData(this.userId); 
      }
      },
      error: (err) => {
        console.error('Error al guardar perfil', err);
        this.errorMessage = 'Error al guardar los cambios.';
      },
    });
  }

  // ----------------------------------------------------------
  // Cancelar edición
  // ----------------------------------------------------------
  onCancel(): void {
    this.editMode = false;
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
    this.previewImageUrl = null;
    if (this.userId) this.loadUserData(this.userId);
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
