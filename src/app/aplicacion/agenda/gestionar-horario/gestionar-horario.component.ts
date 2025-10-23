import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendaService, HorarioHabitual, HorarioHabitualInput } from '../agenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gestionar-horario',
  standalone: false,
  templateUrl: './gestionar-horario.component.html',
  styleUrl: './gestionar-horario.component.scss'
})
export class GestionarHorarioComponent {
horarioForm: FormGroup;
  diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  isLoading = false;
  errorCarga: string | null = null;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private agendaService: AgendaService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GestionarHorarioComponent>,
  ) {
    // Inicializamos el formulario con un FormArray vacío
    this.horarioForm = this.fb.group({
      dias: this.fb.array([])
    });
    this.buildDiasFormArray(); // Creamos la estructura para los 7 días
  }

  ngOnInit(): void {
    this.loadHorario();
  }

  onCancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin devolver nada
  }

  // Helper para acceder fácilmente al FormArray en el template
  get diasFormArray(): FormArray {
    return this.horarioForm.get('dias') as FormArray;
  }

  // Crea la estructura del FormArray con 7 FormGroups (uno por día)
  private buildDiasFormArray(): void {
    for (let i = 0; i < 7; i++) {
      this.diasFormArray.push(this.fb.group({
        dia_semana: [i], // Guardamos el número del día (0-6)
        enabled: [false], // Checkbox/Toggle para habilitar el día
        // Validadores: requeridos SOLO si 'enabled' es true
        hora_inicio: ['', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')], // Formato HH:MM
        hora_fin: ['', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
        duracion_turno_min: [60, Validators.min(1)] // Default 60 mins, mínimo 1
      }));

      // Suscripción para añadir/quitar validadores dinámicamente
      const dayGroup = this.diasFormArray.at(i);
      dayGroup.get('enabled')?.valueChanges.subscribe(enabled => {
        const horaInicioCtrl = dayGroup.get('hora_inicio');
        const horaFinCtrl = dayGroup.get('hora_fin');
        const duracionCtrl = dayGroup.get('duracion_turno_min');

        if (enabled) {
          horaInicioCtrl?.setValidators([Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]);
          horaFinCtrl?.setValidators([Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]);
          duracionCtrl?.setValidators([Validators.required, Validators.min(1)]);
        } else {
          horaInicioCtrl?.clearValidators();
          horaFinCtrl?.clearValidators();
          duracionCtrl?.clearValidators();
          // Opcional: Limpiar valores cuando se deshabilita
          // horaInicioCtrl?.setValue('');
          // horaFinCtrl?.setValue('');
          // duracionCtrl?.setValue(60);
        }
        horaInicioCtrl?.updateValueAndValidity();
        horaFinCtrl?.updateValueAndValidity();
        duracionCtrl?.updateValueAndValidity();
      });
    }
  }

  // Carga el horario actual desde el backend
  loadHorario(): void {
    this.isLoading = true;
    this.errorCarga = null;
    this.agendaService.getHorarioHabitual().subscribe({
      next: (horariosActuales) => {
        this.patchForm(horariosActuales);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar horario:", err);
        this.errorCarga = "No se pudo cargar el horario actual.";
        this.isLoading = false;
      }
    });
  }

  private patchForm(horarios: HorarioHabitual[]): void {
    horarios.forEach(h => {
      const dayGroup = this.diasFormArray.controls.find(control => control.get('dia_semana')?.value === h.dia_semana);
      if (dayGroup) {
        dayGroup.patchValue({
          enabled: true,
          hora_inicio: h.hora_inicio.substring(0, 5), 
          hora_fin: h.hora_fin.substring(0, 5),
          duracion_turno_min: h.duracion_turno_min
        });
      }
    });
    // Asegurarse que los días NO incluidos queden deshabilitados (ya empiezan en false)
    this.diasFormArray.controls.forEach(control => {
        if (!horarios.some(h => h.dia_semana === control.get('dia_semana')?.value)) {
            control.get('enabled')?.setValue(false);
        }
    });

  }

  onSubmit(): void {
    if (this.horarioForm.invalid) {
      this.snackBar.open('Por favor, revisa los campos marcados en rojo.', 'Cerrar', { duration: 3000 });
      // Marcar todos los campos como tocados para mostrar errores
      this.horarioForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    // Filtra solo los días habilitados y mapea al formato Input
    const formValue = this.horarioForm.value.dias as Array<any>;
    const horarioParaEnviar: HorarioHabitualInput[] = formValue
      .filter(dia => dia.enabled)
      .map(dia => ({
        dia_semana: dia.dia_semana,
        hora_inicio: dia.hora_inicio,
        hora_fin: dia.hora_fin,
        duracion_turno_min: dia.duracion_turno_min
      }));

    this.agendaService.updateHorarioHabitual(horarioParaEnviar).subscribe({
      next: (horarioGuardado) => {
        this.snackBar.open('Horario guardado correctamente.', 'OK', { duration: 3000 });
        this.patchForm(horarioGuardado); // Opcional: repopular con la respuesta por si la BD ajusta algo
        this.isSaving = false;
        this.horarioForm.markAsPristine(); // Marcar como no modificado
      },
      error: (err) => {
        console.error("Error al guardar horario:", err);
        const errMsg = err.error?.message || 'Error desconocido al guardar.';
        this.snackBar.open(`Error: ${errMsg}`, 'Cerrar', { duration: 5000 });
        this.isSaving = false;
      }
    });
  }
}
