import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
    selector: 'app-theme-toggle-button',
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss'],
    animations: [
        trigger('iconFade', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.8)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
            ])
        ])
    ],
    standalone: false
})
export class ThemeToggleComponent {
  isDarkTheme: boolean;

    constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme);
  }
}



