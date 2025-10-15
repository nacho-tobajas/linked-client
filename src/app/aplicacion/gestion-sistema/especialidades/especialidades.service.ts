import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from './especialidades.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
private endpoint = `${environment.urlApi}especialidades`;

  constructor(private http: HttpClient) {
  }

  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.endpoint}/create`, especialidad);
  }

  updateEspecialidad(id: number,especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.endpoint}/${id}`, especialidad);
  }

  getAllEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.endpoint}/findall`);
  }

  getEspecialidad(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.endpoint}/${id}`);
  }

  deleteEspecialidad(id: number): Observable<Especialidad> {
    return this.http.delete<Especialidad>(`${this.endpoint}/${id}`);
  }

}
