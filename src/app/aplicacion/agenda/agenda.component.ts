import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GestionarHorarioComponent } from './gestionar-horario/gestionar-horario.component';
import { AgendaService } from './agenda.service';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from 'src/app/models/turno/turno.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-agenda',
  standalone: false,
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {

  displayedColumns: string[] = ['fecha', 'hora', 'cliente', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Turno>([]); 

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort; 

  isLoadingTurnos = false;
  errorTurnos: string | null = null;

constructor(private dialog: MatDialog, private agendaService: AgendaService) { } 

  ngOnInit(): void {
    this.loadTurnos(); 
  }

  abrirConfiguracionHorario(): void {
    const dialogRef = this.dialog.open(GestionarHorarioComponent, {
      width: '85%', 
      maxWidth: '800px', 
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo de horario se cerró');
      // 'result' podría traer info si el modal devuelve algo al cerrarse
      // Aquí podrías, por ejemplo, refrescar algo si fuera necesario
    });
  }

  ngAfterViewInit(): void {
    // Conecta paginador y ordenador al dataSource DESPUÉS de que se rendericen
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Logica de turnos

  loadTurnos(): void {
    this.isLoadingTurnos = true;
    this.errorTurnos = null;

    // TODO: Implementar getMisTurnos() en AgendaService o TurnoService
    /*
    this.agendaService.getMisTurnos().subscribe({
      next: (turnos) => {
        this.dataSource.data = turnos;
        this.isLoadingTurnos = false;
      },
      error: (err) => {
        console.error("Error al cargar turnos:", err);
        this.errorTurnos = "No se pudieron cargar los turnos.";
        this.isLoadingTurnos = false;
      }
    });
    */

    // --- DATOS DE EJEMPLO (Borrar cuando tengas el backend) ---
    const ejemploTurnos: Turno[] = [
      { id: 1, fecha_hora_inicio: new Date(2025, 9, 28, 10, 0), fecha_hora_fin: new Date(2025, 9, 28, 11, 0), id_cliente: 10, cliente: { realname: 'Cliente', surname: 'Uno' }, estado: 'Pendiente', descripcion_cliente:'Leon en antebrazo' },
      { id: 2, fecha_hora_inicio: new Date(2025, 9, 29, 14, 0), fecha_hora_fin: new Date(2025, 9, 29, 15, 0), id_cliente: 11, cliente: { realname: 'Cliente', surname: 'Dos' }, estado: 'Confirmada', descripcion_cliente:'Frase lettering' },
      { id: 3, fecha_hora_inicio: new Date(2025, 10, 1, 11, 0), fecha_hora_fin: new Date(2025, 10, 1, 12, 0), id_cliente: 12, cliente: { realname: 'Cliente', surname: 'Tres' }, estado: 'Pendiente' }
    ];
    this.dataSource.data = ejemploTurnos;
    this.isLoadingTurnos = false;
    // --- FIN DATOS DE EJEMPLO ---
  }

  // Filtro para la tabla (opcional)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // --- Acciones de la tabla (Placeholders) ---

  verDetalleTurno(turno: Turno): void {
    console.log("Ver detalle:", turno);
    // TODO: Abrir un diálogo/modal con toda la info del turno, descripción, imágenes, mensajes
    // const dialogRef = this.dialog.open(DetalleTurnoDialogComponent, { data: turno });
  }

  aceptarTurno(turno: Turno): void {
    console.log("Aceptar:", turno);
    // TODO: Llamar al servicio backend para cambiar estado a 'Confirmada'
    // this.agendaService.cambiarEstadoTurno(turno.id, 'Confirmada').subscribe(() => this.loadTurnos());
  }

  rechazarTurno(turno: Turno): void {
    console.log("Rechazar:", turno);
    // TODO: Abrir diálogo para poner motivo y llamar al servicio backend para cambiar estado a 'Rechazada'
    // const dialogRef = this.dialog.open(RechazarTurnoDialogComponent, { data: turno });
    // dialogRef.afterClosed().subscribe(motivo => {
    //   if (motivo) {
    //      this.agendaService.cambiarEstadoTurno(turno.id, 'Rechazada', motivo).subscribe(() => this.loadTurnos());
    //   }
    // });
  }

  completarTurno(turno: Turno): void {
    console.log("Completar:", turno);
    // TODO: Llamar al servicio backend para cambiar estado a 'Completada'
    // this.agendaService.cambiarEstadoTurno(turno.id, 'Completada').subscribe(() => this.loadTurnos());
  }

}
