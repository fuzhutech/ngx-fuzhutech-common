import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-carousel',
    templateUrl: './fz-demo-carousel.component.html',
    styleUrls: ['./fz-demo-carousel.component.scss']
})
export class FzDemoCarouselComponent implements OnInit {

    array = [1, 2, 3, 4]; // try dynamic change the array

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            this.array = [1, 2, 3, 4];
        }, 500);
    }

}
