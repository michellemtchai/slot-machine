import { Component, OnInit, Input } from '@angular/core';
import { getBlockImage } from '../../helpers/slot-machine';

@Component({
    selector: 'app-slot-machine',
    templateUrl: './slot-machine.component.html',
    styleUrls: ['./slot-machine.component.css'],
})
export class SlotMachineComponent {
    getBlockImage = getBlockImage;
    @Input() blocks: Array<string>;
    @Input() play: () => void;

    constructor() {
        this.blocks = new Array<string>();
        this.play = () => {};
    }
}
