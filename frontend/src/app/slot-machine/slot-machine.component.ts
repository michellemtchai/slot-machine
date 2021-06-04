import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RollResult, GameEnd } from '../interfaces';
import { api } from '../api';

@Component({
    selector: 'app-slot-machine',
    templateUrl: './slot-machine.component.html',
    styleUrls: ['./slot-machine.component.css'],
})
export class SlotMachineComponent implements OnInit {
    credit: number;
    blocks: Array<string>;
    rolling: boolean;
    constructor(private http: HttpClient) {
        this.blocks = defaultSlots;
        this.credit = 0;
        this.rolling = false;
    }
    ngOnInit(): void {
        this.newGame();
    }
    newGame(): void {
        api.get(this.http, '/game/start').subscribe(
            (data: any) => {
                this.credit = data.credit;
                this.blocks = defaultSlots;
            }
        );
    }
    play(): void {
        if (!this.rolling) {
            let prev = this.blocks;
            if (this.credit > 0) {
                this.blocks = new Array<string>('', '', '');
                this.rolling = true;
            }
            api.post(
                this.http,
                '/game/play',
                (error: string) => {
                    this.blocks = prev;
                    this.rolling = false;
                    alert(error);
                }
            ).subscribe((data: any) => {
                if (data.inSession) {
                    this.updateGameState(data, -1);
                } else {
                    this.restartGame(data);
                }
            });
        } else {
            alert('The slot machine is still rolling.');
        }
    }
    cashout = () => {
        api.post(this.http, '/game/cashout').subscribe(
            (data: any) => {
                this.restartGame(data);
            }
        );
    };
    getBlockImage(block: string): string {
        let formatFile = (name: string) => `/assets/${name}.svg`;
        switch (block) {
            case 'C':
                return formatFile('cherries');
            case 'L':
                return formatFile('lemon');
            case 'O':
                return formatFile('orange');
            case 'W':
                return formatFile('watermelon');
            default:
                return formatFile('spinner');
        }
    }
    updateGameState(data: RollResult, index: number): void {
        if (index < this.blocks.length) {
            setTimeout(() => {
                if (index >= 0) {
                    this.blocks[index] = data.blocks[index];
                }
                this.updateGameState(data, index + 1);
            }, 1000);
        } else {
            this.credit = data.credit;
            this.rolling = false;
        }
    }
    restartGame(data: GameEnd): void {
        if (this.credit !== 0) {
            this.credit = 0;
        }
        if (confirm(data.message)) {
            this.newGame();
        }
    }
}
const defaultSlots: Array<string> = new Array<string>(
    'C',
    'L',
    'O'
);
