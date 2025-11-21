import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrabajosService } from 'src/app/services/trabajos/trabajos.service.js';

@Component({
  selector: 'app-subir-trabajo',
  standalone: false,
  templateUrl: './subir-trabajo.component.html',
  styleUrl: './subir-trabajo.component.scss'
})
export class SubirTrabajoComponent {
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  descripcion: string = '';
  isUploading = false;
  maxFiles = 5;

  constructor(
    private dialogRef: MatDialogRef<SubirTrabajoComponent>,
    private trabajosService: TrabajosService
  ) {}

onFileSelected(event: any): void {
    const files = event.target.files;
    
    if (files) {
      // Validar cantidad total
      if (this.selectedFiles.length + files.length > this.maxFiles) {
        alert(`Solo puedes subir hasta ${this.maxFiles} fotos por publicación.`);
        return;
      }

      // Procesar cada archivo
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        // Generar preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    // Limpiar input para permitir seleccionar más
    event.target.value = null;
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  subir(): void {
    // 👇 CAMBIO: Validar array vacío
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;
    
    // 👇 CAMBIO: Pasar el array 'this.selectedFiles'
    this.trabajosService.subirTrabajo(this.descripcion, this.selectedFiles).subscribe({
      next: (res) => {
        this.dialogRef.close(true); 
      },
      error: (err) => {
        console.error(err);
        alert('Error al subir las imágenes');
        this.isUploading = false;
      }
    });
  }
}
