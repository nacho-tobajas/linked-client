import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'button[appNoDoubleSubmit]',
  standalone: true
})
export class NoDoubleSubmitDirective {
  @Input() submitDelay = 1500;
  private pending = false;

  constructor(private el: ElementRef<HTMLButtonElement>) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.pending) {
      // El click ya fue procesado: bloquear todos los listeners posteriores
      event.stopImmediatePropagation();
      return;
    }
    this.pending = true;
    // Diferir el disabled al siguiente tick para no bloquear el submit del formulario
    setTimeout(() => {
      this.el.nativeElement.disabled = true;
      setTimeout(() => {
        this.pending = false;
        this.el.nativeElement.disabled = false;
      }, this.submitDelay);
    }, 0);
  }
}
