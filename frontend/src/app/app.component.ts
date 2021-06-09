import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiService } from '../helpers/api-service';
import { RollResult, GameEnd } from '../helpers/interfaces';
import {
    defaultSlots,
    busyCheckAction,
    getBlockImage,
    ROLL_INTERVAL,
} from '../helpers/slot-machine';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = environment.APP_NAME;
    credit: number;
    blocks: Array<string>;
    rolling: boolean;
    cashingOut: boolean;
    api: ApiService;

    constructor(private http: HttpClient) {
        this.blocks = defaultSlots;
        this.credit = 0;
        this.rolling = false;
        this.cashingOut = false;
        this.api = new ApiService(http);
    }

    ngOnInit(): void {
        this.newGame();
    }
    newGame(): void {
        this.api.get('/game/start', (data: any) => {
            this.credit = data.credit;
            this.blocks = defaultSlots;
        });
    }
    play = (): void => {
        let next = () => {
            let prev = this.blocks;
            if (this.credit > 0) {
                this.blocks = new Array<string>('', '', '');
                this.rolling = true;
            }
            this.api.post(
                '/game/play',
                (data: any) => {
                    if (data.inSession) {
                        this.updateGameState(data, -1);
                    } else {
                        this.restartGame(data);
                    }
                },
                (error: string) => {
                    this.blocks = prev;
                    this.rolling = false;
                    alert(error);
                }
            );
        };
        busyCheckAction(this.rolling, this.cashingOut, next);
    };
    cashout = () => {
        let next = () => {
            this.cashingOut = true;
            this.api.post('/game/cashout', (data: any) => {
                this.cashingOut = false;
                this.restartGame(data);
            });
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
            }, ROLL_INTERVAL);
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
