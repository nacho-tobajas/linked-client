import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Reserva } from "src/app/aplicacion/reserva/reserva.model";


@Injectable({
    providedIn: 'root',
})
export class ReservaService{
    private endpoint = `${environment.urlApi}reserva`;

    constructor(private http: HttpClient){
    }

    createReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.endpoint}/create`, reserva);
    }

    updateReserva(id: Number, reserva: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(`${this.endpoint}/${id}`, reserva);
    }

    getAllReservas(): Observable<Reserva[]>{
        return this.http.get<Reserva[]>(this.endpoint);
    }

    getReserva(id:number): Observable<Reserva>{
        return this.http.get<Reserva>(`${this.endpoint}/${id}`);
    }

    deleteReserva(id:number): Observable<Reserva>{
        return this.http.delete<Reserva>(`${this.endpoint}/${id}`);
    }
}