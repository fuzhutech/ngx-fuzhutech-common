import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoTransferComponent} from './fz-demo-transfer.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoTransferComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoTransferRoutingModule {
}
