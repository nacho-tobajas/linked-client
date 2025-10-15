import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/aplicacion/gestion-sistema/especialidades/especialidades.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TatuadorService {
private apiUrl = `${environment.urlApi}tatuador`;

  constructor(private http: HttpClient) {}

  getEspecialidadesTatuador(userId: number): Observable<Especialidad[]>  {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/${userId}/especialidades`);
  }

  assignEspecialidades(userId: number, especialidadIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/asignar-especialidades`, { especialidadIds });
  }

  removeEspecialidad(userId: number, especialidadId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/quitar-especialidad/${especialidadId}`);
  }
}
