import {Component, HostBinding, OnInit} from '@angular/core';
import {MessageService} from '../../lib/components/message/message.service';
import {NotificationService} from '../../lib/components/notification/notification.service';
import {slideInDownAnimation} from '../../lib/core/animation/animations';

@Component({
    selector: 'fz-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [slideInDownAnimation]
})
export class HomeComponent implements OnInit {

    // 添加@HostBinding属性添加到类中以设置这个路由组件元素的动画和样式
    // @HostBinding('@routeAnimation') routeAnimation = true;
    // @HostBinding('style.display') display = 'block';
    // @HostBinding('style.position') position = 'absolute';

    constructor() {
        console.log('HomeComponent create');
    }

    ngOnInit() {
    }


}




