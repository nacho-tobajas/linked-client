import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Output() especialidadesChange = new EventEmitter<Especialidad[]>();

  especialidades: Especialidad[] = [];
  todasEspecialidades: Especialidad[] = [];

  especialidadCtrl = new FormControl('');
  filteredEspecialidades!: Observable<Especialidad[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private tatuadorService: TatuadorService,
    private especialidadesService: EspecialidadesService
  ) {}

  ngOnInit(): void {
    this.loadEspecialidades();
    
    this.filteredEspecialidades = this.especialidadCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!))
    );
  }

  private loadEspecialidades(): void {
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
}