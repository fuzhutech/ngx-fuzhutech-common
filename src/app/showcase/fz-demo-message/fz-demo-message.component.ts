import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../lib/components/message/message.service';

@Component({
    selector: 'fz-fz-demo-message',
    templateUrl: './fz-demo-message.component.html',
    styleUrls: ['./fz-demo-message.component.scss']
})
export class FzDemoMessageComponent implements OnInit {

    constructor(private _message: MessageService) {
    }

    ngOnInit() {
    }

    createBasicMessage() {
        this._message.info('这是一条普通的提醒');

        this._message.error('这个一条错误提醒');
        this._message.loading('这是一条加载提醒');
        this._message.success('这是一条成功提醒');
        this._message.warning('这是一条警告提醒');
    }

}
