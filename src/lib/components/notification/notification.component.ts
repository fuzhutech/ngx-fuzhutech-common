import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {Component, ViewEncapsulation} from '@angular/core';
import {NotificationContainerComponent} from './notification-container.component';
import {MessageComponent} from '../message/message.component';

@Component({
    selector: 'fz-notification',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('enterLeave', [
            state('enter', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => enter', [
                style({opacity: 0, transform: 'translateX(5%)'}),
                animate('100ms linear')
            ]),
            state('leave', style({opacity: 0, transform: 'translateY(-10%)'})),
            transition('* => leave', [
                style({opacity: 1, transform: 'translateY(0)'}),
                animate('100ms linear')
            ]),
        ])
    ],
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends MessageComponent {
    constructor(container: NotificationContainerComponent) {
        super(container);
    }

    onClickClose(): void {
        this._destroy();
    }
}

