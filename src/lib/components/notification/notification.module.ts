import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER} from './notification-config';
import {NotificationContainerComponent} from './notification-container/notification-container.component';
import {NotificationComponent} from './notification.component';
import {NotificationService} from './notification.service';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [NotificationComponent, NotificationContainerComponent],
    providers: [FZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER/*, NotificationService*/],
    entryComponents: [NotificationContainerComponent],
})
export class FzNotificationModule {
}
