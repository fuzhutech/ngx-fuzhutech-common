import {Overlay} from '@angular/cdk/overlay';
import {Injectable} from '@angular/core';
import {MessageDataOptions} from '../message/message.definitions';
import {MessageBaseService} from '../message/message.service';
import {NotificationContainerComponent} from './notification-container.component';
import {NotificationData, NotificationDataFilled} from './notification.definitions';

@Injectable()
export class NotificationService extends MessageBaseService<NotificationContainerComponent, NotificationData> {

    constructor(overlay: Overlay) {
        super(overlay, NotificationContainerComponent, 'notification-');
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

    // For content with html
    html(html: string, options?: MessageDataOptions): NotificationDataFilled {
        return this.createMessage({html}, options) as NotificationDataFilled;
    }
}
