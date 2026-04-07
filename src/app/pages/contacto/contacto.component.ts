import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class ContactoComponent {}
