import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoBackTopComponent} from './fz-demo-back-top.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoBackTopComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoBackTopRoutingModule {
}
