import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.scss'],
    standalone: false
})
export class LoadingOverlayComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
