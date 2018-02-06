import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineItemComponent } from './timeline-item.component';
import { TimelineComponent } from './timeline.component';

@NgModule({
    declarations: [ TimelineItemComponent, TimelineComponent ],
    exports     : [ TimelineItemComponent, TimelineComponent ],
    imports     : [ CommonModule ]
})
export class FzTimelineModule {
}
