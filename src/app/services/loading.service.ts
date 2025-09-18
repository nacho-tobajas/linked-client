import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private showTime = 0;
  private readonly minDuration = 400;

  show() {
    this.showTime = Date.now();
    // Esperar al próximo "tick" para evitar ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.loadingSubject.next(true), 0);
  }

  hide() {
    const elapsed = Date.now() - this.showTime;
    const remaining = this.minDuration - elapsed;

    setTimeout(() => {
      this.loadingSubject.next(false);
    }, Math.max(0, remaining));
  
  }

}
