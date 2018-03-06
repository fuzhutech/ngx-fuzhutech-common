import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoNotificationComponent} from './fz-demo-notification.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoNotificationComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoNotificationRoutingModule {
}
