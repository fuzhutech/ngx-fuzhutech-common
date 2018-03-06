import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoTransferComponent} from './fz-demo-transfer.component';
import {FzDemoTransferRoutingModule} from './fz-demo-transfer-routing.module';
import {FzTransferModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzTransferModule,
        FzDemoTransferRoutingModule
    ],
    declarations: [FzDemoTransferComponent]
})
export class FzDemoTransferModule {
}
