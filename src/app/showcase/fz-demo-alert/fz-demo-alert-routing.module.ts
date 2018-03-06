import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoAlertComponent} from './fz-demo-alert.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoAlertComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoAlertRoutingModule {
}
