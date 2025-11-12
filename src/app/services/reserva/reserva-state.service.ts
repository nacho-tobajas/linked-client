import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaStateService {
private datosReserva: any = {};

  setDatos(datos: any): void {
    this.datosReserva = datos;
  }

  getDatos(): any {
    const datos = this.datosReserva;
    this.clear(); // Limpiamos para que no queden datos viejos
    return datos;
  }

  clear(): void {
    this.datosReserva = {};
  }
}
