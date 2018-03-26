import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TimelineComponent} from './timeline.component';
import {TimelineItemComponent} from './timeline-item/timeline-item.component';
import {TimelinePendingComponent} from './timeline-pending/timeline-pending.component';

@NgModule({
    declarations: [
        TimelineComponent,
        TimelineItemComponent,
        TimelinePendingComponent
    ],
    exports: [
        TimelineComponent,
        TimelineItemComponent,
        TimelinePendingComponent
    ],
    imports: [CommonModule]
})
export class FzTimelineModule {
}
