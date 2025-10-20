import { Especialidad } from "src/app/aplicacion/gestion-sistema/especialidades/especialidades.model";
import { User } from "../user.model";

export interface Tatuador extends User {
  especialidades: Especialidad[]; 
  antiguedad: Date;
  estudio: string;
}