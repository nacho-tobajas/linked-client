import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SolicitarTurnoDto {
  tatuadorId: number;
  fecha_hora_inicio: string; 
  fecha_hora_fin: string;    
  descripcion_cliente: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
private apiUrl = `${environment.urlApi}turnos`;

  constructor(private http: HttpClient) { }

  solicitarTurno(datos: SolicitarTurnoDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitar`, datos);
  }

  // (Aquí agregarías después el método para subir las imágenes)
  // (Y los métodos para GET /mis-turnos del cliente y tatuador)
}
