import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-calendario',
  imports: [BrowserAnimationsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit{
  @Output() dateSelected = new EventEmitter<Date>();
  currentDate: Date = new Date();
  weeks: Date[][] = [];
  selectedDate: Date | null = null;
  confirmedDate: Date | null = null; //Confirmo la fecha

ngOnInit() {
    this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  generateCalendar(year: number, month: number) {
    this.weeks = [];
    
    // 1. Obtener el primer día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    
    // 2. Averiguar qué día de la semana es (0=Dom, 1=Lun, 2=Mar...)
    const firstDayOfWeek = firstDayOfMonth.getDay(); 

    // 3. Calcular cuántos días "rebobinar" para empezar en Lunes
    // Si el día es Lunes (1), restamos 0 días.
    // Si el día es Martes (2), restamos 1 día.
    // Si el día es Domingo (0), restamos 6 días.
    const adjustment = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;

    // 4. Encontrar la fecha del primer Lunes del calendario
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - adjustment);

    let currentDay = new Date(startDate);

    // 5. Generar 6 semanas (42 días)
    for (let i = 0; i < 6; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        week.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  prevMonth() {
    // 6. Corregir la navegación de meses
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  nextMonth() {
    // 7. Corregir la navegación de meses
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  selectDate(day: Date | null): void {
    if (day) {
      this.selectedDate = day;
      this.dateSelected.emit(day);
    }
  }

  isSelected(day: Date): boolean {
    // Comprobación segura
    return !!this.selectedDate && this.selectedDate.toDateString() === day.toDateString();
  }

  confirmDate() {
    if (this.selectedDate) {
      this.confirmedDate = this.selectedDate;
      console.log(this.confirmedDate);
    }
  }

}
