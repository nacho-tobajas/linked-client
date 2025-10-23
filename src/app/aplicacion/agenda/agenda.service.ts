import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface HorarioHabitual {
  id?: number;
  id_tatuador: number;
  dia_semana: number; 
  hora_inicio: string;
  hora_fin: string;
  duracion_turno_min: number;
}

export interface HorarioHabitualInput {
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  duracion_turno_min: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = `${environment.urlApi}agenda`; 

  constructor(private http: HttpClient) { }

  getHorarioHabitual(): Observable<HorarioHabitual[]> {
    return this.http.get<HorarioHabitual[]>(`${this.apiUrl}/horario-habitual`);
  }

  updateHorarioHabitual(horarios: HorarioHabitualInput[]): Observable<HorarioHabitual[]> {
    return this.http.put<HorarioHabitual[]>(`${this.apiUrl}/horario-habitual`, horarios);
  }

}