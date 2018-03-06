import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoRateComponent} from './fz-demo-rate.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoRateComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoRateRoutingModule {
}
