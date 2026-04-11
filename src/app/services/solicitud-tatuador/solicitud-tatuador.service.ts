import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SolicitudTatuador {
  id: number;
  idUser: number;
  estudio: string | null;
  especialidadesIds: number[];
  status: 'pendiente' | 'aprobada' | 'rechazada';
  notas: string | null;
  adminUser: string | null;
  creationtimestamp: string;
  user: {
    id: number;
    username: string;
    email: string;
    realname?: string;
    surname?: string;
    localidad?: string;
    especialidades?: { id: number; nombre: string }[];
  };
}

@Injectable({ providedIn: 'root' })
export class SolicitudTatuadorService {
  private endpoint = `${environment.urlApi}solicitudes-tatuador`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SolicitudTatuador[]> {
    return this.http.get<SolicitudTatuador[]>(`${this.endpoint}/`);
  }

  aprobar(id: number): Observable<SolicitudTatuador> {
    return this.http.put<SolicitudTatuador>(`${this.endpoint}/${id}/aprobar`, {});
  }

  rechazar(id: number, notas?: string): Observable<SolicitudTatuador> {
    return this.http.put<SolicitudTatuador>(`${this.endpoint}/${id}/rechazar`, { notas });
  }
}
