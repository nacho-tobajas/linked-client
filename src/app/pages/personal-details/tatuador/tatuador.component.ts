import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Especialidad } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.model';
import { EspecialidadesService } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.service';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-tatuador',
  templateUrl: './tatuador.component.html',
  styleUrls: ['./tatuador.component.scss'],
  standalone:false
})
export class TatuadorComponent implements OnInit {
  @Input() userId!: number|undefined;
  @Input() initialEstudio: string | null | undefined = null;
  @Input() initialFechaInicio: Date | null | undefined = null;

  @Output() especialidadesChange = new EventEmitter<Especialidad[]>();

  tatuadorForm: FormGroup;
  today: Date = new Date();
  especialidades: Especialidad[] = [];
  todasEspecialidades: Especialidad[] = [];

  especialidadCtrl = new FormControl('');
  filteredEspecialidades!: Observable<Especialidad[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private tatuadorService: TatuadorService,
    private especialidadesService: EspecialidadesService,
    private fb: FormBuilder
  ) {
    this.tatuadorForm = this.fb.group({
      estudio: [''],
      fecha_inicio_actividad: [null]
    });
  }

  ngOnInit(): void {
    this.loadEspecialidades();
    
    this.filteredEspecialidades = this.especialidadCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!))
    );

    this.patchFormIfNeeded();
  }

  // Detecta si los valores iniciales cambian después de ngOnInit
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialEstudio'] || changes['initialFechaInicio']) {
      this.patchFormIfNeeded();
    }
  }

  // Método para actualizar el formulario con los valores iniciales
  private patchFormIfNeeded(): void {
    if (this.tatuadorForm) { // Asegúrate que el form ya exista
        this.tatuadorForm.patchValue({
            estudio: this.initialEstudio ?? '',
            fecha_inicio_actividad: this.initialFechaInicio ? new Date(this.initialFechaInicio) : null
        });
    }
  }

  private loadEspecialidades(): void {
    if (!this.userId) return;
    // Cargar especialidades del tatuador
    this.tatuadorService.getEspecialidadesTatuador(this.userId!).subscribe(res => {
      this.especialidades = res;
      this.emitChanges();
    });

    // Cargar todas las especialidades
    this.especialidadesService.getAllEspecialidades().subscribe(res => {
      this.todasEspecialidades = res;
    });
  }

  addEspecialidad(event: MatAutocompleteSelectedEvent): void {
    const especialidad = event.option.value as Especialidad;
    if (!this.especialidades.some((e) => e.id === especialidad.id)) {
      this.especialidades.push(especialidad);
      this.emitChanges(); // Avisamos al componente padre
    }
    this.especialidadCtrl.setValue('');
  }

  removeEspecialidad(especialidad: Especialidad): void {
  // Encuentra el índice y elimina localmente
  const index = this.especialidades.findIndex(e => e.id === especialidad.id);

  if (index >= 0) {
    this.especialidades.splice(index, 1);
    this.emitChanges(); // Avisamos al componente padre que la lista cambió
  }
  }

  private emitChanges(): void {
    this.especialidadesChange.emit(this.especialidades);
  }

  private _filter(value: string | Especialidad): Especialidad[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.nombre.toLowerCase();
    return this.todasEspecialidades.filter(
      e => !this.especialidades.some(asig => asig.id === e.id) &&
           e.nombre.toLowerCase().includes(filterValue)
    );
  }

  //Metodo para que el componente padre obtenga los datos
  
  public getTatuadorData(): { estudio?: string | null, fecha_inicio_actividad?: Date | null } {
    return this.tatuadorForm.value;
  }
}