import { Component, OnInit } from '@angular/core';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf, NgFor } from '@angular/common';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
import { AgendaService } from '../../agenda/agenda.service';
import { SolicitarTurnoDto, TurnosService } from 'src/app/services/turnos/turnos.service';
import { ReservaStateService } from 'src/app/services/reserva/reserva-state.service';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatCalendar } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-seleccionar-horario',
    templateUrl: './seleccionar-horario.component.html',
    styleUrl: './seleccionar-horario.component.scss',
    imports: [MatIconButton, MatRipple, MatIcon, NgIf, MatCalendar, NgFor, FormsModule]
})
export class SeleccionarHorarioComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  isSaving = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private tatuadorService: TatuadorService,
              private agendaService: AgendaService,
              private turnosService: TurnosService,
              private reservaStateService: ReservaStateService
  ){
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);

    // Cargamos los próximos 6 meses
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 6);
  }

  // Datos del Turno
  selectedTatuador: Tatuador | null = null;
  tatuadorId: number | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';

  // Horarios
  horarios: string[] = [];
  isLoadingHorarios = false;
  errorHorarios: string | null = null;

  // Fechas bloqueadas
  private fechasBloqueadasSet = new Set<string>();
  isLoadingFechas = false;

  // Descripción
  descripcionCliente: string = '';

  // Imágenes
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  maxFiles = 3;

  /** Función que MatCalendar usa para habilitar/deshabilitar fechas */
  readonly dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const iso = date.toISOString().split('T')[0];
    return !this.fechasBloqueadasSet.has(iso);
  };

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('tatuadorId');
    if (idStr) {
      this.tatuadorId = +idStr;
      this.tatuadorService.getTatuadores().subscribe(tatuadores => {
        this.selectedTatuador = tatuadores.find(t => t.idUser === this.tatuadorId) || null;
        if (!this.selectedTatuador) {
          this.router.navigate(['/reserva/listado']);
        } else {
          this.cargarFechasBloqueadas();
        }
      });
    } else {
      this.router.navigate(['/reserva/listado']);
    }

    const imgs = this.reservaStateService.getImagenes();
    if (imgs.length > 0) {
      this.selectedFiles = [...imgs];
      imgs.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  private cargarFechasBloqueadas(): void {
    if (!this.tatuadorId) return;
    this.isLoadingFechas = true;

    this.agendaService.getFechasBloqueadas(this.tatuadorId, this.minDate, this.maxDate).subscribe({
      next: (fechas) => {
        this.fechasBloqueadasSet = new Set(fechas);
        this.isLoadingFechas = false;
      },
      error: () => {
        // No bloquear el flujo si falla — el backend igual valida al confirmar
        this.isLoadingFechas = false;
      }
    });
  }

  onDateSelected(date: Date | null): void {
    if (!date) return;
    this.selectedDate = date;
    this.horarios = [];
    this.selectedTime = '';
    this.isLoadingHorarios = true;
    this.errorHorarios = null;

    if (!this.tatuadorId) return;

    this.agendaService.getHorariosDisponibles(this.tatuadorId, date).subscribe({
      next: (slots) => {
        this.horarios = slots;
        this.isLoadingHorarios = false;
        if (slots.length === 0) {
          this.errorHorarios = 'No hay horarios disponibles para este día.';
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoadingHorarios = false;
        this.errorHorarios = 'Error al cargar los horarios del tatuador.';
      }
    });
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  canConfirm(): boolean {
    return !!(this.selectedDate && this.selectedTime && this.descripcionCliente.trim() !== '' && this.selectedFiles.length > 0);
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;

    if (files) {
      const totalFiles = this.selectedFiles.length + files.length;

      if (totalFiles > this.maxFiles) {
        alert(`Solo puedes subir un máximo de ${this.maxFiles} imágenes.`);
        event.target.value = null;
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }

    event.target.value = null;
  }

  confirmarReserva(): void {
    if (!this.canConfirm() || !this.selectedDate || !this.tatuadorId) {
      alert("Por favor, completa la fecha, hora, descripción y sube al menos una imagen.");
      return;
    }
    this.isSaving = true;

    const [hInicio, mInicio] = this.selectedTime.split(':');
    const fecha_hora_inicio = new Date(this.selectedDate);
    fecha_hora_inicio.setHours(parseInt(hInicio), parseInt(mInicio), 0, 0);

    const fecha_hora_fin = new Date(fecha_hora_inicio);
    fecha_hora_fin.setMinutes(fecha_hora_fin.getMinutes() + 60);

    const solicitudDto: SolicitarTurnoDto = {
      tatuadorId: this.tatuadorId,
      fecha_hora_inicio: fecha_hora_inicio.toISOString(),
      fecha_hora_fin: fecha_hora_fin.toISOString(),
      descripcion_cliente: this.descripcionCliente
    };

    this.turnosService.solicitarTurno(solicitudDto, this.selectedFiles).subscribe({
      next: (turnoCreado) => {
        const datosParaConfirmar = {
            tatuador: this.selectedTatuador,
            fecha_hora_inicio: fecha_hora_inicio.toISOString(),
        };

        this.reservaStateService.setDatos(datosParaConfirmar);
        this.reservaStateService.clearImagenes();

        this.router.navigate(['/reserva/confirmacion']);
      },
      error: (err) => {
        console.error(err);
        alert(`Error: ${err.error?.message || 'No se pudo procesar la solicitud.'}`);
        this.isSaving = false;
      }
    });
  }

  getPhotoUrl(photo?: string): string {
    if (!photo) return 'assets/images/default-profile.jpg';
    if (photo.startsWith('http')) return photo;
    return environment.urlImg + photo;
  }

  goBack(): void {
    this.location.back();
  }
}
