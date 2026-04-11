import { User } from '../user.model';

export interface TurnoTatuador { //Tabla intermedia (mas de un tatuador)
    tatuador: User; 
}
export interface ImagenRef {
  id: number;
  image_path: string;
}
export interface TurnoSesion {
  id: number;
  fecha_hora_inicio: Date | string; 
  fecha_hora_fin: Date | string;
  id_cliente: number;
  cliente?: Partial<User>; 
  descripcion_cliente?: string;
  estado: string; 
  imagenes?: ImagenRef[];
  tatuadoresAsignados?: TurnoTatuador[];
}