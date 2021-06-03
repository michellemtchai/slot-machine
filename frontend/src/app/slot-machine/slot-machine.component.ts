import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RollResult } from '../interfaces';

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
        this.blocks = new Array<string>('C', 'L', 'O');
        this.credit = 0;
        this.rolling = false;
    }
    ngOnInit(): void {
        this.http
            .get<any>(`${environment.API_BASE_URL}/game/start`)
            .subscribe((data: any) => {
                this.credit = data.credit;
            });
    }
    play(): void {
        if (!this.rolling) {
            this.blocks = new Array<string>('', '', '');
            this.rolling = true;
            this.http
                .post<RollResult>(
                    `${environment.API_BASE_URL}/game/play`,
                    {
                        credit: this.credit,
                    }
                )
                .subscribe((data: RollResult) => {
                    this.updateGameState(data, 0);
                });
        } else {
            alert('The slot machine is still rolling.');
        }
    }
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
                this.blocks[index] = data.blocks[index];
                this.updateGameState(data, index + 1);
            }, 1000);
        } else {
            this.credit = data.credit;
            this.rolling = false;
        }
    }
}
