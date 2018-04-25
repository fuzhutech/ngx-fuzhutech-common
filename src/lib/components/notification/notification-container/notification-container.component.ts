import {Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {MessageContainerComponent} from '../../message/message-container.component';
import {NotificationConfig, FZ_NOTIFICATION_CONFIG, FZ_NOTIFICATION_DEFAULT_CONFIG} from '../notification-config';
import {MessageDataFilled, MessageDataOptions} from '../../message/message.definitions';
import {FZ_MESSAGE_CONFIG, FZ_MESSAGE_DEFAULT_CONFIG, MessageConfig} from '../../message/message-config';

@Component({
    selector: 'fz-notification-container',
    // encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    templateUrl: './notification-container.component.html',
    styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent {

    messages: MessageDataFilled[] = [];
    config: NotificationConfig;

    constructor(@Optional() @Inject(FZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NotificationConfig,
                @Optional() @Inject(FZ_NOTIFICATION_CONFIG) config: NotificationConfig) {
        this.config = {...defaultConfig, ...config};
    }

    setConfig(config: MessageConfig): void {
        this.config = {...this.config, ...config};
    }

    // Create a new message
    createMessage(message: MessageDataFilled): void {
        if (this.messages.length >= this.config.nzMaxStack) {
            this.messages.splice(0, 1);
        }
        message.options = this._mergeMessageOptions(message.options);
        this.messages.push(message);
    }

    // Remove a message by messageId
    removeMessage(messageId: string): void {
        this.messages.some((message, index) => {
            if (message.messageId === messageId) {
                this.messages.splice(index, 1);
                return true;
            }
        });
    }

    // Remove all messages
    removeMessageAll(): void {
        this.messages = [];
    }

    // Merge default options and cutom message options
    protected _mergeMessageOptions(options: MessageDataOptions): MessageDataOptions {
        const defaultOptions: MessageDataOptions = {
            nzDuration: this.config.nzDuration,
            nzAnimate: this.config.nzAnimate,
            nzPauseOnHover: this.config.nzPauseOnHover
        };
        return {...defaultOptions, ...options};
    }
}
