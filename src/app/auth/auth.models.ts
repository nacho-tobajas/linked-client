export class User {
  id: number = 0;
  idUserAuth?: string;
  realname: undefined | string = '';
  surname: undefined | string = '';
  username: string = '';
  email: string = '';
  birth_date?: Date;
  delete_date?: Date;
  creationuser?: string;
  creationtimestamp?: Date;
  password?: string;
  salt?: string;
  status?: boolean;
  modificationuser?: string;
  modificationtimestamp?: Date;
}
