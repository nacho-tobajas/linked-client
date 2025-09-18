import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'app-theme';

  constructor() {
    this.loadTheme();
  }

  setTheme(isDark: boolean) {
    const themeClass = isDark ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(themeClass);
    localStorage.setItem(this.themeKey, themeClass);
  }

  isDarkTheme(): boolean {
    return localStorage.getItem(this.themeKey) === 'dark-theme';
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    } else {
      this.setTheme(false);
    }
  }
}

