import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { LoadingInterceptor } from './components/loading.interceptor';

import { SupportTicketComponent } from './aplicacion/support-ticket/support-ticket.component';
import { SupportTicketCreateComponent } from './aplicacion/support-ticket/support-ticket-create/support-ticket-create.component';
import { SupportTicketDeleteComponent } from './aplicacion/support-ticket/support-ticket-delete/support-ticket-delete.component';
import { SupportTicketDetailComponent } from './aplicacion/support-ticket/support-ticket-detail/support-ticket-detail.component';
import { SupportTicketUpdateComponent } from './aplicacion/support-ticket/support-ticket-update/support-ticket-update.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterService } from './services/auth/register.service';
import { HomeComponent } from './pages/home/home.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { SoporteComponent } from './aplicacion/support-ticket/soporte/soporte.component';
import { UsuariosComponent } from './aplicacion/usuarios/usuarios.component';
import { UpdateRolComponent } from './aplicacion/usuarios/update-rol/update-rol.component';
import { SweItemMenuComponent } from './components/sweitemmenu/sweitemmenu.component';
import { SweItemMenuService } from './components/sweitemmenu/sweitemmenu.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { CarouselModule } from './components/carousel/carousel.module';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { DropdownSelectComponent } from './components/dropdown-selector/dropdown-selector.component';
import { ResetPassComponent } from './auth/resetPass/resetPass.component';
import { ForgotPassComponent } from './auth/forgotPass/forgotPass.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { HttpErrorInterceptor } from './services/auth/http-error.interceptor';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './components/custom-date-adapter/custom-date-adapter.js';
import { CalendarioComponent } from "./components/calendario/calendario.component";


registerLocaleData(localeEsAr); // 👈 Esto registra el locale

@NgModule({
    declarations: [
        AppComponent,
        ErrorDialogComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        NavComponent,
        PersonalDetailsComponent,
        ConfirmComponent,
        SupportTicketComponent,
        SupportTicketCreateComponent,
        SupportTicketDeleteComponent,
        SupportTicketDetailComponent,
        SupportTicketUpdateComponent,
        RegisterComponent,
        HomeComponent,
        NotAuthorizedComponent,
        SoporteComponent,
        UsuariosComponent,
        UpdateRolComponent,
        SweItemMenuComponent,
        LoadingOverlayComponent,
        HelpDialogComponent,
        ThemeToggleComponent,
        DropdownSelectComponent,
        ResetPassComponent,
        ForgotPassComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatCardActions,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CarouselModule,
    MatChipsModule,
    MatTooltipModule,
    MatSliderModule, CalendarioComponent]
    , providers: [
        RegisterService,
        RegisterService,
        SweItemMenuService,
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LOCALE_ID, useValue: 'es-AR' },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    ]
})
export class AppModule { }
