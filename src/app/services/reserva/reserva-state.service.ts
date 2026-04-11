import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaStateService {
  private datosReserva: any = {};
  private imagenesReferencia: File[] = [];

  setDatos(datos: any): void {
    this.datosReserva = datos;
  }

  getDatos(): any {
    const datos = this.datosReserva;
    this.clear();
    return datos;
  }

  clear(): void {
    this.datosReserva = {};
  }

  setImagenes(files: File[]): void {
    this.imagenesReferencia = [...files];
  }

  getImagenes(): File[] {
    return this.imagenesReferencia;
  }

  clearImagenes(): void {
    this.imagenesReferencia = [];
  }
}
