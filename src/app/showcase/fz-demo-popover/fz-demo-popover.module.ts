import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoPopoverComponent} from './fz-demo-popover.component';
import {FzDemoPopoverRoutingModule} from './fz-demo-popover-routing.module';
import {FzPopoverModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzPopoverModule,
        FzDemoPopoverRoutingModule
    ],
    declarations: [FzDemoPopoverComponent]
})
export class FzDemoPopoverModule {
}
