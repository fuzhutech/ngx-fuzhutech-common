import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoMessageComponent} from './fz-demo-message.component';
import {FzDemoMessageRoutingModule} from './fz-demo-message-routing.module';
import {FzMessageModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzMessageModule,
        FzDemoMessageRoutingModule
    ],
    declarations: [FzDemoMessageComponent]
})
export class FzDemoMessageModule {
}
