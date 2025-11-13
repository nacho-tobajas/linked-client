import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GestionarHorarioComponent } from './gestionar-horario/gestionar-horario.component';
import { AgendaService } from './agenda.service';
import { MatTableDataSource } from '@angular/material/table';
import { TurnoSesion } from 'src/app/models/turno/turno-sesion.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnosService, TurnoTatuadorResponse } from 'src/app/services/turnos/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agenda',
  standalone: false,
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fecha', 'hora', 'cliente', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<TurnoSesion>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort; 

  isLoadingTurnos = false;
  errorTurnos: string | null = null;

constructor(
    private dialog: MatDialog, 
    private turnosService: TurnosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTurnos(); 
  }

  abrirConfiguracionHorario(): void {
    // ... (tu código de abrir diálogo)
    const dialogRef = this.dialog.open(GestionarHorarioComponent, {
      width: '85%', maxWidth: '800px', disableClose: true,
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Configura el Sort para que acceda a los datos anidados
    this.dataSource.sortingDataAccessor = (item: TurnoSesion, headerId: string) => {
      switch (headerId) {
        case 'fecha': return item.fecha_hora_inicio;
        case 'hora': return item.fecha_hora_inicio;
        case 'cliente': return item.cliente?.realname || '';
        case 'estado': return item.estado || '';
        default: return (item as any)[headerId];
      }
    };
  }

  //Logica de turnos

  loadTurnos(): void {
    this.isLoadingTurnos = true;
    this.errorTurnos = null;

    this.turnosService.getMisTurnos().subscribe({
      next: (turnosTatuador: TurnoTatuadorResponse[]) => {
        this.dataSource.data = turnosTatuador.map(tt => tt.turnoSesion);
        this.isLoadingTurnos = false;
      },
      error: (err) => {
        console.error("Error al cargar turnos:", err);
        this.errorTurnos = "No se pudieron cargar los turnos.";
        this.isLoadingTurnos = false;
      }
    });
  }

  // Filtro para la tabla 
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    // Configura el filtro para buscar en datos anidados
    this.dataSource.filterPredicate = (data: TurnoSesion, filter: string) => {
      const dataStr = 
        (data.cliente?.realname || '') + 
        (data.cliente?.surname || '') + 
        data.estado +
        new Date(data.fecha_hora_inicio!).toLocaleDateString('es-AR'); // "dd/MM/yyyy"
      return dataStr.toLowerCase().includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // --- Acciones de la tabla (CONECTADAS) ---

  verDetalleTurno(turno: TurnoSesion): void {
    console.log("Ver detalle:", turno);
    // TODO: Abrir un diálogo/modal con toda la info
    // const dialogRef = this.dialog.open(DetalleTurnoDialogComponent, { data: turno });
  }

  aceptarTurno(turno: TurnoSesion): void {
    this.gestionarTurno(turno.id!, 'Confirmada');
  }

  rechazarTurno(turno: TurnoSesion): void {
    // TODO: Pedir un motivo
    // Por ahora, lo rechazamos directamente
    this.gestionarTurno(turno.id!, 'Rechazada');
  }

  completarTurno(turno: TurnoSesion): void {
    this.gestionarTurno(turno.id!, 'Completada');
  }

  //Función helper para llamar al servicio de gestión y actualizar la UI

  private gestionarTurno(id: number, nuevoEstado: string): void {
    this.turnosService.gestionarTurno(id, nuevoEstado).subscribe({
      next: (turnoActualizado) => {
        this.snackBar.open(`Turno ${nuevoEstado.toLowerCase()} correctamente.`, 'OK', { duration: 3000 });
        // Actualizamos la fila en la tabla SIN recargar todo
        const index = this.dataSource.data.findIndex(t => t.id === id);
        if (index > -1) {
          this.dataSource.data[index] = turnoActualizado;
          this.dataSource._updateChangeSubscription(); // Forzar refresco de la tabla
        } else {
          this.loadTurnos(); // Fallback por si no lo encuentra
        }
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open(`Error: ${err.error?.message || 'No se pudo actualizar el turno.'}`, 'Cerrar', { duration: 5000 });
      }
    });
  }
  
}
