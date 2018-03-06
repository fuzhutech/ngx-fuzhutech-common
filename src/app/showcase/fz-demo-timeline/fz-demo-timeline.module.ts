import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoTimelineComponent} from './fz-demo-timeline.component';
import {FzDemoTimelineRoutingModule} from './fz-demo-timeline-routing.module';
import {FzTimelineModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzTimelineModule,
        FzDemoTimelineRoutingModule
    ],
    declarations: [FzDemoTimelineComponent]
})
export class FzDemoTimelineModule {
}
