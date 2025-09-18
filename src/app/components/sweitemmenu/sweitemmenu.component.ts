import { Component, OnInit } from '@angular/core';
import { SweItemMenuService } from './sweitemmenu.service';
import { idRolesPorItemMenu, MenuItem } from './sweitemmenu.models';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { filter, firstValueFrom, forkJoin, map, Observable, of, switchMap } from 'rxjs';


@Component({
    selector: 'app-sweitemmenu',
    templateUrl: './sweitemmenu.component.html',
    styleUrls: ['./sweitemmenu.component.scss'],
    standalone: false
})

export class SweItemMenuComponent implements OnInit {


  menuItems: MenuItem[] = [];
  espaciadoLateral: string = '';
  userRoles: number[] = [];
  flagMenu: number = 0;

  constructor(
    private sweItemMenuService: SweItemMenuService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadServices();

  }

  async loadServices() {
    await this.loadUserRols()

    this.loadMenuItems();

  }

  async loadUserRols(): Promise<number[]> {
    try {
      const idUser = await firstValueFrom(this.userService.getUserId());
      if (idUser != null) {
        const userRols = await firstValueFrom(this.userService.getAllUserRoles(idUser));
        this.userRoles = userRols;
        return userRols;
      }
    } catch (err) {
      console.error('Error cargando roles:', err);
    }
    return [];
  }


  loadMenuItems(): void {
    this.sweItemMenuService.getMenuItem().subscribe(items => {
      const itemMap = new Map<number, MenuItem>();
      const menuItems: MenuItem[] = [];

      items.forEach(item => {
        if (!item.idSupItemMenu && this.validaRoles(item)) {
          itemMap.set(item.id, { ...item, expanded: false, subMenus: [] });
          menuItems.push(itemMap.get(item.id)!);
        }
      });

      items.forEach(itemHijo => {
        if (itemHijo.idSupItemMenu && this.validaRoles(itemHijo)) {
          menuItems.forEach(itemPadre => {
            if (Number(itemHijo.idSupItemMenu) == itemPadre.id) {
              let indexItemPadre = menuItems.indexOf(itemPadre);
              menuItems[indexItemPadre].subMenus.push(itemHijo);
            }
          });
        }
      });

      menuItems.sort((a, b) => a.ordernumber - b.ordernumber);
      menuItems.forEach(item => {
        item.subMenus.sort((a, b) => a.ordernumber - b.ordernumber);
      });

      this.menuItems = menuItems;

    });
  }

  //Valida que segun el item, alguno de los roles que posea el usuario coincida con los roles del item
  validaRoles(item: MenuItem): boolean {

    let rolesItem: number[] = [];

    item.roles_permitidos.split(',').forEach(rol => {
      rolesItem.push(Number(rol));
    });

    let flag: boolean = false;

    rolesItem.forEach(rol => {
      if (this.userRoles.map(Number).includes(rol)) {
        flag = true;
      }
    });
    return flag;
  }

  toggleSubMenu(item: MenuItem): void {
    item['expanded'] = !item['expanded'];
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  getItemHeight(item: MenuItem): string {
    if (!item.expanded) {
      return '50px'; // Altura normal cuando está colapsado
    }
    const baseHeight = 50; // Altura base del ítem principal
    const subItemHeight = 50; // Altura de cada submenú
    return `${baseHeight + (item.subMenus?.length || 0) * subItemHeight}px`;
  }

}
