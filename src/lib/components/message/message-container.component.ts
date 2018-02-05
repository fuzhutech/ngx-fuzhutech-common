import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MessageConfig, FZ_MESSAGE_CONFIG, FZ_MESSAGE_DEFAULT_CONFIG} from './message-config';
import {MessageDataFilled, MessageDataOptions} from './message.definitions';

@Component({
    selector: 'fz-message-container',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="ant-message">
            <fz-message *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"></fz-message>
        </div>
    `,
    styleUrls: ['./message.component.scss']
})
export class MessageContainerComponent {
    messages: MessageDataFilled[] = [];
    config: MessageConfig;

    constructor(@Optional() @Inject(FZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: MessageConfig,
                @Optional() @Inject(FZ_MESSAGE_CONFIG) config: MessageConfig) {
        this.config = {...defaultConfig, ...config};
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
