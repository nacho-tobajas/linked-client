import { Component } from '@angular/core';
import { Prereserva } from '../prereserva.model';
import { Tatuador } from 'src/app/models/tatuador/tatuador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReservaStateService } from 'src/app/services/prereserva/reserva-state.service';
import { TatuadorService } from 'src/app/services/user/tatuador.service';

@Component({
  selector: 'app-seleccionar-horario',
  standalone: false,
  templateUrl: './seleccionar-horario.component.html',
  styleUrl: './seleccionar-horario.component.scss'
})
export class SeleccionarHorarioComponent {

  constructor(private router: Router,
              private reservaStateService: ReservaStateService,
              private route: ActivatedRoute,
              private location: Location,
              private tatuadorService: TatuadorService
  ){

  }
  // --- Datos de Horarios (Esto es lo que estaba comentado) ---
  selectedTatuador: Tatuador | null = null;
  selectedDate: Date | null = null;
  selectedTime: string = '';
  selectedFiles: File[] = [];
  previewImages: string[] = [];
  maxFiles = 3;
  // (Estos horarios deberían venir del backend más adelante)
  horarios: string[] = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  // --- Datos de "Mis Reservas" (Esto también estaba comentado) ---
  prereservas: Prereserva[] = [ 
    { id: 1, nombre: 'Reserva Ejemplo', fecha: '20/10/2025', imagen: '', estado: 'Pendiente' } 
  ];
  selectedprereserva: Prereserva | null = null;
  cancelada = false;
  imagenPrevia: string | null = null;
  imagenSubida: boolean = false;

  ngOnInit(): void {
    const tatuadorId = this.route.snapshot.paramMap.get('tatuadorId');

    if (tatuadorId) {
      this.tatuadorService.getTatuadores().subscribe(tatuadores => {
        this.selectedTatuador = tatuadores.find(t => t.idUser === +tatuadorId) || null;
        
        if (!this.selectedTatuador) {
          // Si no se encontró el tatuador, redirigimos
          console.error('No se encontró el tatuador con ID:', tatuadorId);
          this.router.navigate(['/prereserva/listado']);
        }
      });

    } else {
      // Si no hay ID en la URL, no podemos continuar. Volvemos al listado.
      console.error('No se proporcionó ID de tatuador en la URL');
      this.router.navigate(['/prereserva/listado']);
    }
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    // Aquí deberías llamar al servicio para traer los horarios de ESE día
    // this.cargarHorarios(this.selectedTatuadorId, date);
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  canConfirm(): boolean {
    // El botón de confirmar se activa si hay fecha, hora Y al menos una imagen
    return !!(this.selectedDate && this.selectedTime && this.selectedFiles.length > 0);
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
    event.target.value = null; // Limpia el input
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  confirmarReserva(): void {
  if (this.canConfirm()) {
    const datosParaConfirmar = {
        tatuador: this.selectedTatuador,
        fecha: this.selectedDate,
        hora: this.selectedTime
    };
    this.reservaStateService.setDatos(datosParaConfirmar);
    this.router.navigate(['/prereserva/confirmacion']);
  }
  }

  irAMisReservas(): void {
  this.router.navigate(['/mis-reservas']);
}
  goBack(): void {
    this.location.back(); 
  }
}
