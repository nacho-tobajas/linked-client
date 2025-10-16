export class Especialidad {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  status: boolean = false;
}