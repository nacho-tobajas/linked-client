import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrl: './privacidad.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class PrivacidadComponent {
  lastUpdated = 'Enero 2025';
}
