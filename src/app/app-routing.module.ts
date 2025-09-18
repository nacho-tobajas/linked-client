import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

import { LoginComponent } from './auth/login/login.component';

import { AppComponent } from './app.component';


import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { SoporteComponent } from './aplicacion/support-ticket/soporte/soporte.component';
import { SupportTicketComponent } from './aplicacion/support-ticket/support-ticket.component';
import { SupportTicketCreateComponent } from './aplicacion/support-ticket/support-ticket-create/support-ticket-create.component';
import { ForgotPassComponent } from './auth/forgotPass/forgotPass.component';
import { ResetPassComponent } from './auth/resetPass/resetPass.component';
import { UsuariosComponent } from './aplicacion/usuarios/usuarios.component';
import { adminModGuard } from './guards/admin-mod.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [adminGuard] },
  { path: 'soporte', component: SoporteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPass', component: ForgotPassComponent },
  { path: 'reset-password', component: ResetPassComponent },
  { path: 'info', component: PersonalDetailsComponent },
  { path: 'support-ticket', component: SupportTicketComponent, canActivate: [adminModGuard] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }, //redireccionar a inicio si no hay match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
