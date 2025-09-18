import { Page } from './pagination';

export class RolApl {
    id?: number = 0;
    description?: string;
    creationuser?: string;
    creationtimestamp?: Date;
    modificationuser?: string;
    modificationtimestamp?: Date;
    status?: boolean;
}

export interface UserPage extends Page<RolApl> {
    content: RolApl[];
}