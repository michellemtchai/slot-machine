import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-credit-status',
    templateUrl: './credit-status.component.html',
    styleUrls: ['./credit-status.component.css'],
})
export class CreditStatusComponent {
    @Input() credit?: number;
}
