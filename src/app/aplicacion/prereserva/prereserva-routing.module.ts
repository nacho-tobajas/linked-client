import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrereservaComponent } from './prereserva.component';
import { ListadoTatuadoresComponent } from './listado-tatuadores/listado-tatuadores.component';
import { SeleccionarHorarioComponent } from './seleccionar-horario/seleccionar-horario.component';
import { ConfirmacionReservaComponent } from './confirmacion-reserva/confirmacion-reserva.component';

const routes: Routes = [
  {
    path: '', // La ruta base será /prereserva
    component: PrereservaComponent,
    children: [
      { path: 'listado', component: ListadoTatuadoresComponent },
      // Usamos un parámetro (:tatuadorId) para pasar el ID
      { path: 'horarios/:tatuadorId', component: SeleccionarHorarioComponent },
      { path: 'confirmacion', component: ConfirmacionReservaComponent },
      // Redirección por defecto si entran a /prereserva
      { path: '', redirectTo: 'listado', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrereservaRoutingModule { }