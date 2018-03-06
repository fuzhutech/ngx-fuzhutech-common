import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoCodeBoxComponent} from './fz-demo-code-box.component';
import {FzDemoCodeBoxRoutingModule} from './fz-demo-code-box-routing.module';
import {FzCodeBoxModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzCodeBoxModule,
        FzDemoCodeBoxRoutingModule
    ],
    declarations: [FzDemoCodeBoxComponent]
})
export class FzDemoCodeBoxModule {
}
