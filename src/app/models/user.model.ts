import { Especialidad } from '../aplicacion/gestion-sistema/especialidades/especialidades.model.js';
import { Page } from './pagination';

export class User {
  id: number = 0;
  idUser: number = 0;
  idUserAuth?: string;
  roles?: string[];
  rolDescription: string | undefined;
  rolDesc: string | undefined;
  realname?: string;
  surname?: string;
  username: string = '';
  email?: string;
  birth_date?: Date;
  delete_date?: Date;
  creationuser?: string;
  creationtimestamp?: Date;
  password?: string;
  salt?: string;
  status?: boolean;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  profile_photo?: string;
  estudio?: string;
  fecha_inicio_actividad?: Date;
  antiguedad?: number; 
  especialidades?: Especialidad[];

}

export interface UserPage extends Page<User> {
  content: User[];
}
