import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-slot-machine',
    templateUrl: './slot-machine.component.html',
    styleUrls: ['./slot-machine.component.css'],
})
export class SlotMachineComponent implements OnInit {
    blocks: Array<string>;
    constructor() {
        this.blocks = new Array<string>('C', 'L', 'W').map((i) =>
            getBlockImage(i)
        );
    }

    ngOnInit(): void {}
}

const getBlockImage = (block: string) => {
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
};
