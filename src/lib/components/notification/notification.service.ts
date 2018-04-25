import {Overlay} from '@angular/cdk/overlay';
import {Injectable, TemplateRef, Type} from '@angular/core';
import {MessageDataFilled, MessageDataOptions} from '../message/message.definitions';
import {MessageBaseService} from '../message/message.service';
import {NotificationContainerComponent} from './notification-container/notification-container.component';
import {NotificationData, NotificationDataFilled, NotificationDataOptions} from './notification.definitions';
import {MessageConfig} from '../message/message-config';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable()
export class NotificationService {

    protected _counter = 0; // Id counter for messages
    protected _container: NotificationContainerComponent;
    private _idPrefix = 'notification-';

    constructor(overlay: Overlay) {
        const overlayRef = overlay.create();
        const containerPortal = new ComponentPortal(NotificationContainerComponent);
        this._container = overlayRef.attach(containerPortal).instance;
    }

    remove(messageId?: string): void {
        if (messageId) {
            this._container.removeMessage(messageId);
        } else {
            this._container.removeMessageAll();
        }
    }

    createMessage(message: object, options?: MessageDataOptions): MessageDataFilled {
        // TODO: spread on literal has been disallow on latest proposal
        const resultMessage: MessageDataFilled = {
            ...message, ...{
                messageId: this._generateMessageId(),
                options,
                createdAt: new Date()
            }
        };
        this._container.createMessage(resultMessage);

        return resultMessage;
    }

    config(config: MessageConfig): void {
        this._container.setConfig(config);
    }

    protected _generateMessageId(): string {
        return this._idPrefix + this._counter++;
    }


    // Shortcut methods
    success(title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type: 'success', title, content}, options) as NotificationDataFilled;
    }

    error(title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type: 'error', title, content}, options) as NotificationDataFilled;
    }

    info(title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type: 'info', title, content}, options) as NotificationDataFilled;
    }

    warning(title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type: 'warning', title, content}, options) as NotificationDataFilled;
    }

    blank(title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type: 'blank', title, content}, options) as NotificationDataFilled;
    }

    create(type: string, title: string, content: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({type, title, content}, options) as NotificationDataFilled;
    }

    // For content with template
    template(template: TemplateRef<{}>, options?: NotificationDataOptions): NotificationDataFilled {
        return this.createMessage({template}, options) as NotificationDataFilled;
    }
}
