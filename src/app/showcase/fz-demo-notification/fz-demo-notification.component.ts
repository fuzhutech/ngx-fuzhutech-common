import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../lib/components/notification/notification.service';

@Component({
    selector: 'fz-fz-demo-notification',
    templateUrl: './fz-demo-notification.component.html',
    styleUrls: ['./fz-demo-notification.component.scss']
})
export class FzDemoNotificationComponent implements OnInit {

    constructor(private _notification: NotificationService) {
    }

    ngOnInit() {
    }

    createBasicNotification() {
        this._notification.blank('这是标题', '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案');
    }

}
