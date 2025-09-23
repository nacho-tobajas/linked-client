import { Component } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-calendario',
  imports: [BrowserAnimationsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  currentDate: Date = new Date();
  weeks: Date[][] = [];

  ngOnInit() {
    this.generateCalendar(this.currentDate);
  }

  generateCalendar(date: Date) {
    this.weeks = [];
    const firstDay= new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let currentWeek: any[] = [];
    let currentDay = new Date(firstDay);

    //Ajusto lunes como primer dia
    while (currentDay.getDay() !== 1) {
      currentDay.setDate(currentDay.getDate() - 1);
    }
    while (currentDay <= lastDay || currentDay.getDay() !== 1) {
      currentWeek.push(new Date(currentDay));
      if (currentDay.getDay() === 0) { // Domingo
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar(this.currentDate);
  }
}
