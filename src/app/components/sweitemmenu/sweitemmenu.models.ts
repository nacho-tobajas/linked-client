import { Page } from "src/app/models/pagination";

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    idSupItemMenu: MenuItem;
    roles_permitidos: string;
    endpoint: string;
    ordernumber: number;
    creationtimestamp: Date;
    creationuser: string;
    modificationtimestamp: Date;
    modificationuser: string;
    subMenus: MenuItem[];
    expanded?: boolean;
}

export class idRolesPorItemMenu {
    idItemMenu: number = 0;
    idRoles: number[] = [];
}

export interface SweItemMenuPage extends Page<MenuItem> {
    content: MenuItem[];
}