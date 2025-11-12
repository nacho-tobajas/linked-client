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
    // Formatear la fecha a 'YYYY-MM-DD', que es lo que espera el backend
    const fechaISO = fecha.toISOString().split('T')[0];
    let params = new HttpParams().set('fecha', fechaISO);
    return this.http.get<string[]>(`${this.apiUrl}/${tatuadorId}/slots-dia`, { params });
  }
  
}