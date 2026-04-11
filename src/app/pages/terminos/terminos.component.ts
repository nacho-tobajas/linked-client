import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class TerminosComponent {
  lastUpdated = 'Enero 2025';
}
