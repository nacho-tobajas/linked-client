import { Component } from '@angular/core';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TatuadorService } from 'src/app/services/user/tatuador.service';
import { AgendaService } from '../../agenda/agenda.service';
import { SolicitarTurnoDto, TurnosService } from 'src/app/services/turnos/turnos.service';
import { ReservaStateService } from 'src/app/services/reserva/reserva-state.service';

@Component({
  selector: 'app-seleccionar-horario',
  standalone: false,
  templateUrl: './seleccionar-horario.component.html',
  styleUrl: './seleccionar-horario.component.scss'
})
export class SeleccionarHorarioComponent {

  minDate: Date;

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

  // Descripción 
  descripcionCliente: string = '';
  
  // Imágenes
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  maxFiles = 3;
  
  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('tatuadorId');
    if (idStr) {
      this.tatuadorId = +idStr;
      this.tatuadorService.getTatuadores().subscribe(tatuadores => {
        this.selectedTatuador = tatuadores.find(t => t.idUser === this.tatuadorId) || null;
        if (!this.selectedTatuador) {
          console.error('Tatuador no encontrado');
          this.router.navigate(['/prereserva/listado']);
        }
      });
    } else {
      console.error('No se proporcionó ID de tatuador');
      this.router.navigate(['/prereserva/listado']);
    }
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.horarios = []; // Limpiar
    this.selectedTime = ''; // Resetear
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
    // Elimina el archivo de la lista que se subirá al servidor
    this.selectedFiles.splice(index, 1);
    // Elimina la URL de la lista que se usa para la vista previa
    this.previewImages.splice(index, 1);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    
    if (files) {
      const totalFiles = this.selectedFiles.length + files.length;
      
      // Valida que no se pase del máximo
      if (totalFiles > this.maxFiles) {
        alert(`Solo puedes subir un máximo de ${this.maxFiles} imágenes.`);
        event.target.value = null; // Limpia el input
        return;
      }

      // Itera sobre los archivos seleccionados
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Guarda el archivo (para el backend)
        this.selectedFiles.push(file);

        // Genera la vista previa (para el frontend)
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Limpia el input para permitir seleccionar el mismo archivo de nuevo si se borra
    event.target.value = null; 
  }

  confirmarReserva(): void {
    if (!this.canConfirm() || !this.selectedDate || !this.tatuadorId) {
      alert("Por favor, completa la fecha, hora, descripción y sube al menos una imagen.");
      return;
    }

    // Calcular Fechas ISO para el DTO
    const [hInicio, mInicio] = this.selectedTime.split(':');
    const fecha_hora_inicio = new Date(this.selectedDate);
    fecha_hora_inicio.setHours(parseInt(hInicio), parseInt(mInicio), 0, 0);

    // 60 min ?? Revisar esto
    const fecha_hora_fin = new Date(fecha_hora_inicio);
    fecha_hora_fin.setMinutes(fecha_hora_fin.getMinutes() + 60);

    // Crear el DTO
    const solicitud: SolicitarTurnoDto = {
      tatuadorId: this.tatuadorId,
      fecha_hora_inicio: fecha_hora_inicio.toISOString(),
      fecha_hora_fin: fecha_hora_fin.toISOString(),
      descripcion_cliente: this.descripcionCliente
    };

    this.turnosService.solicitarTurno(solicitud).subscribe({
      next: (turnoCreado) => {
        console.log('Turno creado:', turnoCreado);
        
        const datosParaConfirmar = {
            tatuador: this.selectedTatuador,
            fecha_hora_inicio: fecha_hora_inicio.toISOString(), // Le pasamos la fecha/hora
            // (puedes añadir más datos si los necesitas mostrar)
        };
        
        // Guardamos en el servicio de estado
        this.reservaStateService.setDatos(datosParaConfirmar);
        
        // TODO: Subir las imágenes (this.selectedFiles) asociadas al 'turnoCreado.id'
        
        // Navegamos a la pantalla de confirmación
        this.router.navigate(['/prereserva/confirmacion']);
      },
      error: (err) => {
        console.error(err);
        alert(`Error: ${err.error?.message || 'No se pudo procesar la solicitud.'}`);
      }
    });
  }

  goBack(): void {
    this.location.back(); 
  }
}
