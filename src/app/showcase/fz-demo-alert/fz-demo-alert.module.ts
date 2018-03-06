import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoAlertComponent} from './fz-demo-alert.component';
import {FzDemoAlertRoutingModule} from './fz-demo-alert-routing.module';
import {FzAlertModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzAlertModule,
        FzDemoAlertRoutingModule
    ],
    declarations: [FzDemoAlertComponent]
})
export class FzDemoAlertModule {
}
