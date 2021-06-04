import { Component, Input } from '@angular/core';
import { Dimension, Coordinate } from '../interfaces';
import { cashout, coord } from './cashout';

@Component({
    selector: 'app-cashout',
    templateUrl: './cashout.component.html',
    styleUrls: ['./cashout.component.css'],
    host: {
        '(window:resize)': 'onResize($event)',
    },
})
export class CashoutComponent {
    canCashOut: boolean;
    position: Coordinate;
    screen: Dimension;
    button: Dimension;
    @Input() cashoutAction: () => void;

    constructor() {
        this.button = {
            width: 110,
            height: 35,
        };
        this.canCashOut = true;
        this.position = coord(0, 0);
        this.screen = this.getDimensions();
        this.cashoutAction = () => {};
    }
    getDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    onResize(event: any) {
        this.position = coord(0, 0);
        this.screen = this.getDimensions();
    }
    buttonAction() {
        if (this.canCashOut) {
            this.cashoutAction();
        }
    }
    moveButton() {
        let moveProb = cashout.getRandomInt(100);
        if (moveProb < 50) {
            let moves = cashout.availableMoves(
                this.button,
                this.position,
                this.screen,
                300
            );
            let index = cashout.getRandomInt(moves.length);
            let move = moves[index];
            this.position = coord(move.x, move.y);
        } else {
            let unclickableProb = cashout.getRandomInt(100);
            if (unclickableProb >= 40) {
                this.canCashOut = false;
            }
        }
    }
    resetButton() {
        this.canCashOut = true;
    }
    buttonClass() {
        return !this.canCashOut ? 'unclickable' : '';
    }
}
