import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SupportTicket } from '../../aplicacion/support-ticket/support-ticket.model';

@Injectable({
  providedIn: 'root',
})
export class SupportTicketService {
  private endpoint = `${environment.urlApi}supportTicket`;

  constructor(private http: HttpClient) {
  }

  createSupportTicket(supportTicket: SupportTicket): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(`${this.endpoint}/create`,supportTicket);
  }

  updateSupportTicket(id: number,supportTicket: SupportTicket): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(`${this.endpoint}/${id}`,supportTicket);
  }

  getAllSupportTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.endpoint}/findall`);
  }

  getSupportTicket(id: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.endpoint}/${id}`);
  }

  deleteSupportTicket(id: number): Observable<SupportTicket> {
    return this.http.delete<SupportTicket>(`${this.endpoint}/${id}`);
  }

}
