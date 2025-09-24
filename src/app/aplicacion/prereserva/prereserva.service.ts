import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Prereserva } from "./prereserva.model";

@Injectable({
    providedIn: 'root',
})
export class PrereservaService{
    private endpoint = `${environment.urlApi}prereserva`;

    constructor(private http: HttpClient){
    }

    createPrereserva(prereserva: Prereserva): Observable<Prereserva> {
        return this.http.post<Prereserva>(`${this.endpoint}/create`, prereserva);
    }

    updatePrereserva(id: Number, prereserva: Prereserva): Observable<Prereserva> {
        return this.http.put<Prereserva>(`${this.endpoint}/${id}`, prereserva);
    }

    getAllReservas(): Observable<Prereserva[]>{
        return this.http.get<Prereserva[]>(this.endpoint);
    }

    getPrereserva(id:number): Observable<Prereserva>{
        return this.http.get<Prereserva>(`${this.endpoint}/${id}`);
    }

    deletePrereserva(id:number): Observable<Prereserva>{
        return this.http.delete<Prereserva>(`${this.endpoint}/${id}`);
    }
}