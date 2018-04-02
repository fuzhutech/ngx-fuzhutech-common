import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../lib/components/message/message.service';
import {NotificationService} from '../../lib/components/notification/notification.service';

@Component({
    selector: 'fz-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() {
        console.log('HomeComponent create');
    }

    ngOnInit() {
    }


}




