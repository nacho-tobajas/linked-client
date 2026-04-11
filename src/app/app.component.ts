import { Component, OnInit, OnDestroy } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from './services/auth/login.service';
import { LoadingService } from './services/loading.service';
import { ThemeService } from './core/services/theme.service';
import { UserService } from './services/user/user.service';
import { RolApl } from './models/rol.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'linked-client';
  isLoading$: Observable<boolean>;

  userLoginOn: boolean = false;
  userIsAdmin: boolean = false;
  userId: number | null = null;
  showShell: boolean = true;

  private authSub?: Subscription;
  private routeSub?: Subscription;

  private readonly AUTH_ROUTES = ['/login', '/register', '/forgotPass', '/reset-password'];

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private loadingService: LoadingService,
    private userService: UserService,
    private router: Router,
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.routeSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e) => {
      const url = (e as NavigationEnd).urlAfterRedirects;
      this.showShell = !this.AUTH_ROUTES.some(r => url.startsWith(r));
    });

    this.authSub = this.loginService.userLoginOn.subscribe(async (isLoggedIn) => {
      this.userLoginOn = isLoggedIn;

      if (isLoggedIn) {
        await this.checkIfAdmin();
      } else {
        this.userIsAdmin = false;
        this.userId = null;
      }
    });
  }

  async checkIfAdmin(): Promise<void> {
    try {
      this.userId = await firstValueFrom(this.userService.getUserId());
      if (!this.userId) return;

      const roles = await firstValueFrom(this.userService.getAllUserRoles(this.userId));

      if (roles) {
        for (const idRol of roles) {
          const rol: RolApl = await firstValueFrom(this.userService.getUserRolByidRole(idRol.toString()));

          if (rol.description === 'Administrador') {
            this.userIsAdmin = true;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error al verificar los roles del usuario:', error);
    }
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}