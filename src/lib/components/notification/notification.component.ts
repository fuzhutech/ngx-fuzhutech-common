import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationContainerComponent} from './notification-container/notification-container.component';
import {MessageComponent} from '../message/message.component';
import {NotificationDataFilled} from './notification.definitions';
import {MessageContainerComponent} from '../message/message-container.component';
import {MessageDataFilled, MessageDataOptions} from '../message/message.definitions';

@Component({
    selector: 'fz-notification',
    // encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    animations: [
        trigger('enterLeave', [
            state('enterRight', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => enterRight', [
                style({opacity: 0, transform: 'translateX(5%)'}),
                animate('100ms linear')
            ]),
            state('enterLeft', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => enterLeft', [
                style({opacity: 0, transform: 'translateX(-5%)'}),
                animate('100ms linear')
            ]),
            state('leave', style({
                opacity: 0,
                transform: 'scaleY(0.8)',
                transformOrigin: '0% 0%'
            })),
            transition('* => leave', [
                style({
                    opacity: 1,
                    transform: 'scaleY(1)',
                    transformOrigin: '0% 0%'
                }),
                animate('100ms linear')
            ])
        ])
    ],
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

    @Input() nzMessage: NotificationDataFilled;
    @Input() nzIndex: number;

    protected _options: MessageDataOptions; // Shortcut reference to nzMessage.options

    // For auto erasing(destroy) self
    private _autoErase: boolean; // Whether record timeout to auto destroy self
    private _eraseTimer: number = null;
    private _eraseTimingStart: number;
    private _eraseTTL: number; // Time to live

    constructor(private container: NotificationContainerComponent) {
    }

    close(): void {
        this._destroy();
    }

    get state(): string {
        if (this.nzMessage.state === 'enter') {
            if ((this.container.config.nzPlacement === 'topLeft') || (this.container.config.nzPlacement === 'bottomLeft')) {
                return 'enterLeft';
            } else {
                return 'enterRight';
            }
        } else {
            return this.nzMessage.state;
        }

    }

    ngOnInit(): void {
        this._options = this.nzMessage.options;

        if (this._options.nzAnimate) {
            this.nzMessage.state = 'enter';
        }

        this._autoErase = this._options.nzDuration > 0;

        if (this._autoErase) {
            this._initErase();
            this._startEraseTimeout();
        }
    }

    ngOnDestroy(): void {
        if (this._autoErase) {
            this._clearEraseTimeout();
        }
    }

    onEnter(): void {
        if (this._autoErase && this._options.nzPauseOnHover) {
            this._clearEraseTimeout();
            this._updateTTL();
        }
    }

    onLeave(): void {
        if (this._autoErase && this._options.nzPauseOnHover) {
            this._startEraseTimeout();
        }
    }

    // Remove self
    protected _destroy(): void {
        if (this._options.nzAnimate) {
            this.nzMessage.state = 'leave';
            setTimeout(() => this.container.removeMessage(this.nzMessage.messageId), 200);
        } else {
            this.container.removeMessage(this.nzMessage.messageId);
        }
    }

    private _initErase(): void {
        this._eraseTTL = this._options.nzDuration;
        this._eraseTimingStart = Date.now();
    }

    private _updateTTL(): void {
        if (this._autoErase) {
            this._eraseTTL -= Date.now() - this._eraseTimingStart;
        }
    }

    private _startEraseTimeout(): void {
        if (this._eraseTTL > 0) {
            this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
            this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
            this._eraseTimingStart = Date.now();
        } else {
            this._destroy();
        }
    }

    private _clearEraseTimeout(): void {
        if (this._eraseTimer !== null) {
            window.clearTimeout(this._eraseTimer);
            this._eraseTimer = null;
        }
    }


}

