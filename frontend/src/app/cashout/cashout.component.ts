import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cashout',
    templateUrl: './cashout.component.html',
    styleUrls: ['./cashout.component.css'],
    inputs: ['cashout'],
})
export class CashoutComponent {
    @Input() cashout: () => void;
    constructor() {
        this.cashout = () => {};
    }
}
