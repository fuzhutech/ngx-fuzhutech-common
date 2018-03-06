import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoDropdownComponent} from './fz-demo-dropdown.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoDropdownComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoDropdownRoutingModule {
}
