import {Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {MessageContainerComponent} from '../message/message-container.component';
import {NotificationConfig, FZ_NOTIFICATION_CONFIG, FZ_NOTIFICATION_DEFAULT_CONFIG} from './notification-config';

@Component({
    selector: 'fz-notification-container',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="ant-notification" [style.top]="config1.nzTop" [style.right]="config1.nzRight">
            <fz-notification *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"></fz-notification>
        </div>
    `
})
export class NotificationContainerComponent extends MessageContainerComponent {

    constructor(@Optional() @Inject(FZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NotificationConfig,
                @Optional() @Inject(FZ_NOTIFICATION_CONFIG) config: NotificationConfig) {
        super(defaultConfig, config);
    }

    get config1() {
        return this.config as NotificationConfig;
    }

}
