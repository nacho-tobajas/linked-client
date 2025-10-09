import { Component } from '@angular/core';

interface Tatuador {
  id: number;
  nombre: string;
  especialidad: string;
  imagen: string;
}

interface prereserva {
  id: number;
  nombre: string;
  fecha: string;
  imagen: string;
  estado: string;
}

@Component({
  selector: 'app-prereserva',
  templateUrl: './prereserva.component.html',
  styleUrl: './prereserva.component.scss',
  standalone: false
})
export class PrereservaComponent {
  nombreUsuario = 'Linked';
  step: 'inicio' | 'listado' | 'horarios' | 'confirmacion' | 'misreservas'| 'prereserva'= 'inicio';

  selectedTatuador: Tatuador | null = null;
  selectedprereserva: prereserva | null = null;

  selectedDate: Date | null = null;
  selectedTime: string = '';
   cancelada = false;
  

  tatuadores: Tatuador[] = [
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      especialidad: 'Realismo',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      nombre: 'Ana Rodríguez',
      especialidad: 'Geometría',
      imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      nombre: 'Miguel Torres',
      especialidad: 'Japonés',
      imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      especialidad: 'Acuarela',
      imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    }
  ];

   prereservas: prereserva[] = [
    {
      id: 1,
      nombre: 'Jose García',
      fecha: '11/11/2025 - 10:00',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      estado: 'Pendiente'
    },
     {
      id: 2,
      nombre: 'Roberto Gomez',
      fecha: '15/12/2025 - 12:00',
      imagen: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.netflix.com%2Fes%2Ftitle%2F81196469&psig=AOvVaw3gpc8yCFeiezyNimu7-Whi&ust=1760047034266000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNC7iafMlZADFQAAAAAdAAAAABAE',
      estado: 'Aceptada'
    },
     {
      id: 2,
      nombre: 'Julian Rodriguez',
      fecha: '17/12/2025 - 12:00',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      estado: 'Rechazada'
    },
  ];

  horarios: string[] = [
    '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00'
  ];

  goToListado(): void {
    this.step = 'listado';
  }
  goToMisReservas(): void {
    this.step = 'misreservas';
  }

  goToPreReserva(prereserva:prereserva): void {
   
    this.selectedprereserva = prereserva;
     console.log(this.selectedprereserva);
    this.step = 'prereserva';
    
  }


  selectTatuador(tatuador: Tatuador): void {
    this.selectedTatuador = tatuador;
    this.step = 'horarios';
  }

  goBack(): void {
    if (this.step === 'horarios') {
      this.step = 'listado';
      this.selectedDate = null;
      this.selectedTime = '';
    } else if (this.step === 'listado') {
      this.step = 'inicio';
    } else if (this.step === 'confirmacion') {
      this.step = 'inicio';
      this.selectedTatuador = null;
      this.selectedDate = null;
      this.selectedTime = '';
    }
    else if (this.step === 'misreservas') {
      this.step = 'inicio';
    }
     else if (this.step === 'prereserva') {
      this.step = 'misreservas';
    }
  
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  confirmarReserva(): void {
    if (this.selectedDate && this.selectedTime && this.selectedTatuador) {
      this.step = 'confirmacion';
    }
  }

  volverInicio(): void {
    this.step = 'inicio';
    this.selectedTatuador = null;
    this.selectedDate = null;
    this.selectedTime = '';
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  canConfirm(): boolean {
    return !!(this.selectedDate && this.selectedTime);
  }


cancelarReserva(): void {
  if (!this.selectedprereserva) return; 


  this.selectedprereserva.estado = 'Cancelada';


  const index = this.prereservas.findIndex(p => p.id === this.selectedprereserva?.id);
  if (index !== -1) {
    this.prereservas[index].estado = 'Cancelada';
  }

  this.cancelada = true;


  setTimeout(() => {
    this.cancelada = false;
  }, 3000);
}

imagenPrevia: string | null = null;
imagenSubida: boolean = false;

onImagenSeleccionada(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const archivo = input.files[0];

    // Crea una URL temporal para mostrar la vista previa
    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.imagenPrevia = e.target.result;
      this.imagenSubida = true;

      // Reinicia el mensaje después de unos segundos si querés
      setTimeout(() => (this.imagenSubida = false), 3000);
    };
    lector.readAsDataURL(archivo);
  }
}


}