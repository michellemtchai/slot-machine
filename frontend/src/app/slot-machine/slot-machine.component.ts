import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
    defaultSlots,
    busyCheckAction,
    getBlockImage,
} from '../../helpers/slot-machine';
import { RollResult, GameEnd } from '../../helpers/interfaces';
import { api } from '../../helpers/api';

@Component({
    selector: 'app-slot-machine',
    templateUrl: './slot-machine.component.html',
    styleUrls: ['./slot-machine.component.css'],
})
export class SlotMachineComponent implements OnInit {
    credit: number;
    blocks: Array<string>;
    rolling: boolean;
    cashingOut: boolean;
    getBlockImage: (block: string) => string;

    constructor(private http: HttpClient) {
        this.blocks = defaultSlots;
        this.credit = 0;
        this.rolling = false;
        this.cashingOut = false;
        this.getBlockImage = getBlockImage;
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
        let next = () => {
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
        };
        busyCheckAction(this.rolling, this.cashingOut, next);
    }
    cashout = () => {
        let next = () => {
            this.cashingOut = true;
            api.post(this.http, '/game/cashout').subscribe(
                (data: any) => {
                    this.cashingOut = false;
                    this.restartGame(data);
                }
            );
        };
        busyCheckAction(this.rolling, this.cashingOut, next);
    };
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
        this.rolling = false;
        if (this.credit !== 0) {
            this.credit = 0;
        }
        if (confirm(data.message)) {
            this.newGame();
        }
    }
}
