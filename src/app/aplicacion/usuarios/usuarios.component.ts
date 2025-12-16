import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRolComponent } from './update-rol/update-rol.component';
import { User } from 'src/app/models/user.model';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatIcon, FormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  filteredUsuarios: User[] = [];
  today: Date = new Date();

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'user', 'actions'];

  // Filtros
  filterRolDesc: string = '';
  filterUsername: string = '';
  filterEmail: string = '';
  filterFechaNacDesde: Date | null = null;
  filterFechaNacHasta: Date | null = null;

  filterDesde = (d: Date | null): boolean => {
    if (!d) return false;
    return !this.filterFechaNacHasta || d <= this.filterFechaNacHasta!;
  };

  filterHasta = (d: Date | null): boolean => {
    if (!d) return false;
    return !this.filterFechaNacDesde || d >= this.filterFechaNacDesde!;
  };

  ngOnInit(): void {
    this.loadUsuarios();

  }

  getEditComponent() {
    return UpdateRolComponent;
  }

  openEditDialog(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      const dialogRef = this.dialog.open(UpdateRolComponent, {
        width: '400px',
        disableClose: true,
        data: { user },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadUsuarios(); // Carga o actualiza la lista de Usuarios
        }
      });
    });
  }

  aplicarFiltro(): void {
    if (this.filterFechaNacDesde && this.filterFechaNacHasta && this.filterFechaNacDesde > this.filterFechaNacHasta) {
      alert('La fecha "desde" no puede ser mayor que la fecha "hasta".');
      return;
    }

    this.filteredUsuarios = this.usuarios.filter((usuario: User) => {
      const coincideRol =
        !this.filterRolDesc || usuario.rolDesc?.toLowerCase() === this.filterRolDesc.toLowerCase();

      const coincideNombre =
        !this.filterUsername || usuario.username?.toLowerCase().includes(this.filterUsername.toLowerCase());

      const coincideEmail =
        !this.filterEmail || usuario.email?.toLowerCase().includes(this.filterEmail.toLowerCase());

      const fechaNacimiento = usuario.birth_date ? new Date(usuario.birth_date) : null;
      const coincideFecha =
        (!this.filterFechaNacDesde || (fechaNacimiento && fechaNacimiento >= this.filterFechaNacDesde)) &&
        (!this.filterFechaNacHasta || (fechaNacimiento && fechaNacimiento <= this.filterFechaNacHasta));

      return coincideRol && coincideNombre && coincideEmail && coincideFecha;
    });
  }

  resetFiltro(): void {
    this.filterRolDesc = '';
    this.filterUsername = '';
    this.filterEmail = '';
    this.filterFechaNacDesde = null;
    this.filterFechaNacHasta = null;
    this.filteredUsuarios = [...this.usuarios];
  }


  loadUsuarios(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.usuarios = data;
      this.filteredUsuarios = [...data];
    });
  }

  onDateInput(event: any) {
    let value: string = event.target.value.replace(/\D/g, ''); // solo números
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    event.target.value = value;
  }
}
