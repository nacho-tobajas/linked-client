import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-authorized',
    templateUrl: './not-authorized.component.html',
    styleUrls: ['./not-authorized.component.scss'],
    imports: [MatIcon, MatButton, RouterLink]
})
export class NotAuthorizedComponent {

}
