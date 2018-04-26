import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-popover',
    templateUrl: './fz-demo-popover.component.html',
    styleUrls: ['./fz-demo-popover.component.scss']
})
export class FzDemoPopoverComponent implements OnInit {

    content: any;
    visible: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    clickMe() {
        this.visible = false;
    }

}
