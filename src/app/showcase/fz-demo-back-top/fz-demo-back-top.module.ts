import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoBackTopComponent} from './fz-demo-back-top.component';
import {FzDemoBackTopRoutingModule} from './fz-demo-back-top-routing.module';
import {FzBackTopModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzBackTopModule,
        FzDemoBackTopRoutingModule
    ],
    declarations: [FzDemoBackTopComponent]
})
export class FzDemoBackTopModule {
}
