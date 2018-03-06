import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoBadgeComponent} from './fz-demo-badge.component';
import {FzBadgeModule} from '../../../lib/components/badge/badge.module';
import {FzDemoBadgeRoutingModule} from './fz-demo-badge-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FzBadgeModule,
        FzDemoBadgeRoutingModule
    ],
    declarations: [FzDemoBadgeComponent]
})
export class FzDemoBadgeModule {
}
