import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoPopoverComponent} from './fz-demo-popover.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoPopoverComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoPopoverRoutingModule {
}
