import { Component, Input } from '@angular/core';
import { cashout } from './cashout';

@Component({
    selector: 'app-cashout',
    templateUrl: './cashout.component.html',
    styleUrls: ['./cashout.component.css'],
    inputs: ['cashoutAction'],
    host: {
        '(window:resize)': 'onResize($event)',
    },
})
export class CashoutComponent {
    x: number;
    y: number;
    screenWidth: number;
    screenHeight: number;
    @Input() cashoutAction: () => void;
    constructor() {
        this.cashoutAction = () => {};
        this.x = 0;
        this.y = 0;
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
    }
    onResize(event: any) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.x = 0;
        this.y = 0;
    }
    moveButton() {
        let moveProb = cashout.getRandomInt(100);
        if (moveProb < 50) {
            let moves = cashout.availableMoves(
                this.x,
                this.y,
                this.screenWidth,
                this.screenHeight,
                300
            );
            let index = cashout.getRandomInt(moves.length);
            let move = moves[index];
            this.x = move[0];
            this.y = move[1];
        }
    }
}
