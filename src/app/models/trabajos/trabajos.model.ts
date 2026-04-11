import { Tatuador } from "../tatuador/tatuador.model"; 

export interface TrabajoFoto {
  id: number;
  image_path: string;
}

export interface Trabajo {
id: number;
    descripcion?: string;
    tatuador?: Tatuador; 
    fotos: TrabajoFoto[]; 
    favoritos?: any[]; 
    creationtimestamp: Date;
}
