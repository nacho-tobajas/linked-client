import { Especialidad } from "src/app/aplicacion/gestion-sistema/especialidades/especialidades.model";
import { User } from "../user.model";

export interface Tatuador extends User {
    especialidades: Especialidad[];
}

export class TatuajeImagen {
    id?: number;
    fechaSesion?: Date
    url_img?: string;
    formato?: string;
    descripcion?: string;
    tatuador?: Tatuador;
}
