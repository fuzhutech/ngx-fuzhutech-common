import {Component, OnInit} from '@angular/core';
import {animate, query, state, style, transition, trigger} from '@angular/animations';
import {routeAnimation, routerFlyIn, routerTransition} from '../../lib/core/animation/route-animations';

@Component({
    selector: 'fz-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('queryAnimation', [
            transition('* => *', [
                query('h1', style({opacity: 0, color: 'red'})),
                query('.content', style({opacity: 0, color: 'green', width: '100px', height: '100px', border: '1px solid red'})),
                query('h1', animate(1000, style({opacity: 1, color: ' blue'}))),
                query('.content', animate(1000, style({opacity: 1, width: '50px', height: '100px', border: '10px solid green'})),
                    {optional: true}),
            ]),
            transition(':leave', [
                style({color: 'pink'}),
                animate(2000)
            ])
        ]),
        routerTransition,
        routerFlyIn,
        routeAnimation
    ]
})
export class AboutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    goAnimate() {
        console.log('goAnimate');
        return true;
    }

}
