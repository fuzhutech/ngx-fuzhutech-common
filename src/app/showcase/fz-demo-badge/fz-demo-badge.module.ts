import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FzBadgeModule} from '../../../lib';

import {FzDemoBadgeComponent} from './fz-demo-badge.component';
import {FzDemoBadgeRoutingModule} from './fz-demo-badge-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        FzBadgeModule,
        FzDemoBadgeRoutingModule
    ],
    declarations: [FzDemoBadgeComponent]
})
export class FzDemoBadgeModule {
}
