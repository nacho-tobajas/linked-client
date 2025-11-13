import { User } from '../user.model';

export interface TurnoSesion {
  id: number;
  fecha_hora_inicio: Date | string; 
  fecha_hora_fin: Date | string;
  id_cliente: number;
  cliente?: Partial<User>; 
  descripcion_cliente?: string;
  estado: string; // 'Pendiente', 'Confirmada', 'Cancelada', etc.
 
}