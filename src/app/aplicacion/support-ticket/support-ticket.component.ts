import { Component } from '@angular/core';
import { SupportTicket } from './support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { SupportTicketUpdateComponent } from './support-ticket-update/support-ticket-update.component';
import { SupportTicketCreateComponent } from './support-ticket-create/support-ticket-create.component';
import { SupportTicketDetailComponent } from './support-ticket-detail/support-ticket-detail.component';
import { SupportTicketDeleteComponent } from './support-ticket-delete/support-ticket-delete.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss'],
  standalone: false
})
export class SupportTicketComponent {
  supportTickets: SupportTicket[] = [];
  filteredTickets: SupportTicket[] = [];

  filterFechaCarga: Date | null = null;
  filterUsuario: string | null = null
  filterEstadoTicket: boolean | null = null;

  constructor(
    private supportTicketService: SupportTicketService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  displayedColumns: string[] = ['id', 'fechaCarga', 'user', 'status', 'actions'];

  ngOnInit(): void {
    this.loadSupportTickets();
    this.setupResponsiveColumns();
  }

  private setupResponsiveColumns(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // pantalla pequeña: oculto la columna 'user'
        this.displayedColumns = ['id', 'fechaCarga', 'status', 'actions'];
      } else {
        // pantalla grande: muestro todas
        this.displayedColumns = ['id', 'fechaCarga', 'user', 'status', 'actions'];
      }
    });
  }

  getCreateComponent() {
    return SupportTicketCreateComponent;
  }
  getEditComponent() {
    return SupportTicketUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SupportTicketCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
      }
    });
  }

  showDetails(id: number): void {
    this.supportTicketService
      .getSupportTicket(id)
      .subscribe((supportTicket) => {
        const dialogRef = this.dialog.open(SupportTicketDetailComponent, {
          width: '400px',
          disableClose: true,
          data: { supportTicket },
        });
      });
  }

  openEditDialog(id: number): void {
    this.supportTicketService
      .getSupportTicket(id)
      .subscribe((supportTicket) => {
        const dialogRef = this.dialog.open(SupportTicketUpdateComponent, {
          width: '400px',
          disableClose: true,
          data: { supportTicket },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(SupportTicketDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
      }
    });
  }

  loadSupportTickets(): void {
    this.supportTicketService.getAllSupportTickets().subscribe((data) => {
      this.supportTickets = data;
      this.filteredTickets = data;
    });
  }

  aplicarFiltro(): void {
    let fecha: Date | null = null;
    let fechaFiltro: Date | null = null;
    let d1: string | null;
    let d2: string | null;

    this.filteredTickets = this.supportTickets.filter(ticket => {
      if (ticket.creationtimestamp && this.filterFechaCarga) {
        fecha = new Date(ticket.creationtimestamp);
        fechaFiltro = this.filterFechaCarga;
        d1 = fecha.toISOString().split('T')[0];
        d2 = fechaFiltro!.toISOString().split('T')[0];
      }

      const coincideUsuario =
        !this.filterUsuario || ticket.creationuser.toLowerCase().includes(this.filterUsuario.toLowerCase());

      const coincideFecha =
        !this.filterFechaCarga || d1 === d2;

      const coincideEstado =
        !this.filterEstadoTicket || ticket.status === this.filterEstadoTicket;

      return coincideUsuario && coincideFecha && coincideEstado;
    });
  }

  resetFiltro(): void {
    this.filterUsuario = '';
    this.filterFechaCarga = null;
    this.filterEstadoTicket = null;
    this.filteredTickets = [...this.supportTickets];
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
