import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioHabitual, HorarioHabitualInput } from 'src/app/models/horarios-tatuador/horario-habitual';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = `${environment.urlApi}agenda`; 

  constructor(private http: HttpClient) { }

  //Metodos del tatuador
  getHorarioHabitual(): Observable<HorarioHabitual[]> {
    return this.http.get<HorarioHabitual[]>(`${this.apiUrl}/horario-habitual`);
  }

  updateHorarioHabitual(horarios: HorarioHabitualInput[]): Observable<HorarioHabitual[]> {
    return this.http.put<HorarioHabitual[]>(`${this.apiUrl}/horario-habitual`, horarios);
  }

  // Metodos del cliente

  getHorariosDisponibles(tatuadorId: number, fecha: Date): Observable<string[]> {
    const fechaISO = fecha.toISOString().split('T')[0];
    const params = new HttpParams().set('fecha', fechaISO);
    return this.http.get<string[]>(`${this.apiUrl}/${tatuadorId}/slots-dia`, { params });
  }

  getFechasBloqueadas(tatuadorId: number, inicio: Date, fin: Date): Observable<string[]> {
    const params = new HttpParams()
      .set('inicio', inicio.toISOString().split('T')[0])
      .set('fin',    fin.toISOString().split('T')[0]);
    return this.http.get<string[]>(`${this.apiUrl}/${tatuadorId}/fechas-bloqueadas`, { params });
  }
  
}