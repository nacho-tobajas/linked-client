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

// Interfaz para la respuesta de 'getMisTurnos' (viene del repo TurnoTatuador)
export interface TurnoTatuadorResponse {
  tatuador: any; // Info del tatuador
  turnoSesion: any; // Info del TurnoSesion (el turno en sí)
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

  /**
   * Obtiene la lista completa de mensajes para un turno específico.
   * @param turnoId El ID del turno.
   */
  getMensajesTurno(turnoId: number): Observable<any[]> {
    // GET /api/turnos/:id/mensajes
    return this.http.get<any[]>(`${this.apiUrl}/${turnoId}/mensajes`);
  }

  /**
   * Envía un nuevo mensaje asociado a un turno.
   * @param turnoId El ID del turno.
   * @param mensaje El texto del mensaje.
   */
  enviarMensaje(turnoId: number, mensaje: string): Observable<any> {
    const payload = { mensaje: mensaje };
    // POST /api/turnos/:id/mensajes con el body { mensaje: 'texto' }
    return this.http.post<any>(`${this.apiUrl}/${turnoId}/mensajes`, payload);
  }
  
  // métodos para GET /mis-turnos del cliente
}
