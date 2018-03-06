import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoBadgeComponent} from './fz-demo-badge.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoBadgeComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoBadgeRoutingModule {
}
