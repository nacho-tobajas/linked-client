import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [NavComponent]
})
export class HeaderComponent {}
