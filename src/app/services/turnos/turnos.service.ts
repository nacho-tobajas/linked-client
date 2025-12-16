import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { environment } from 'src/environments/environment';

export interface SolicitarTurnoDto {
  tatuadorId: number;
  fecha_hora_inicio: string; 
  fecha_hora_fin: string;    
  descripcion_cliente: string;
}

export interface TurnoTatuadorResponse {
  tatuador: any; 
  turnoSesion: any; 
}

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
private apiUrl = `${environment.urlApi}turnos`;

  constructor(private http: HttpClient) { }

  solicitarTurno(datos: SolicitarTurnoDto, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('tatuadorId', datos.tatuadorId.toString());
    formData.append('fecha_hora_inicio', datos.fecha_hora_inicio);
    formData.append('fecha_hora_fin', datos.fecha_hora_fin);
    formData.append('descripcion_cliente', datos.descripcion_cliente);

    files.forEach(file => {
      formData.append('imagenes', file, file.name);
    });
    
    return this.http.post(`${this.apiUrl}/solicitar`, formData);
  }

  getMisTurnos(): Observable<TurnoTatuadorResponse[]> {
    return this.http.get<TurnoTatuadorResponse[]>(`${this.apiUrl}/mis-turnos`);
  }

  gestionarTurno(idTurno: number, nuevoEstado: string): Observable<any> {
    const body = { estado: nuevoEstado };
    return this.http.patch(`${this.apiUrl}/gestionar/${idTurno}`, body);
  }

  updateTurno(id: number, datos: { fecha_hora_inicio: string, estado: string }): Observable<TurnoSesion> {
    return this.http.put<TurnoSesion>(`${this.apiUrl}/${id}`, datos);
  }
  
  getMensajesTurno(turnoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${turnoId}/mensajes`);
  }

  enviarMensaje(turnoId: number, mensaje: string): Observable<any> {
    const payload = { mensaje: mensaje };
    return this.http.post<any>(`${this.apiUrl}/${turnoId}/mensajes`, payload);
  }

  getMisTurnosCliente(): Observable<TurnoSesion[]> {
    return this.http.get<TurnoSesion[]>(`${this.apiUrl}/mis-reservas-cliente`);
  }

  getHorariosDisponibles(tatuadorId: number, fecha: Date): Observable<string[]> {
  // Convertimos la fecha a string YYYY-MM-DD para enviarla al back
  const fechaStr = fecha.toISOString().split('T')[0];
  
  // Ajusta la URL si tu endpoint está en /agenda o /turnos
  return this.http.get<string[]>(`${this.apiUrl}/disponibilidad`, {
    params: { tatuadorId: tatuadorId.toString(), fecha: fechaStr }
  });
}
  

}
