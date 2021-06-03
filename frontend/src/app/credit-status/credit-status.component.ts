import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-credit-status',
    templateUrl: './credit-status.component.html',
    styleUrls: ['./credit-status.component.css'],
})
export class CreditStatusComponent implements OnInit {
    credit: number;
    constructor() {
        this.credit = 10;
    }

    ngOnInit(): void {}
}
