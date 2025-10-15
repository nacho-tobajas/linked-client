import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
      console.log(this.userId)
      this.especialidades = res;
    });

    // Cargar todas las especialidades
    this.especialidadesService.getAllEspecialidades().subscribe(res => {
      this.todasEspecialidades = res;
    });
  }

  addEspecialidad(event: MatAutocompleteSelectedEvent): void {
    const especialidad = event.option.value as Especialidad;

    // Actualizar backend
    const ids = [...this.especialidades.map(e => e.id), especialidad.id];
    this.tatuadorService.assignEspecialidades(this.userId!, ids).subscribe(updated => {
      this.especialidades = updated;
      this.especialidadCtrl.setValue('');
    });
  }

  removeEspecialidad(especialidad: Especialidad): void {
    this.tatuadorService.removeEspecialidad(this.userId!, especialidad.id).subscribe(updated => {
      this.especialidades = updated;
    });
  }

  private _filter(value: string | Especialidad): Especialidad[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.nombre.toLowerCase();
    return this.todasEspecialidades.filter(
      e => !this.especialidades.some(asig => asig.id === e.id) &&
           e.nombre.toLowerCase().includes(filterValue)
    );
  }
}