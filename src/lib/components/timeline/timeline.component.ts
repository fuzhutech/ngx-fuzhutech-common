import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    OnInit,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import {TimelineItemComponent} from './timeline-item/timeline-item.component';
import {TimelinePendingComponent} from './timeline-pending/timeline-pending.component';

@Component({
    selector: 'fz-timeline',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterContentInit {
    _isPending = false;
    items: TimelineItemComponent[] = [];
    @ContentChildren(TimelineItemComponent) _listOfTimeline: QueryList<TimelineItemComponent>;
    // @ContentChild('pending') _pendingContent: TemplateRef<void>;
    @ContentChild(TimelinePendingComponent) _pendingContent: TemplateRef<TimelinePendingComponent>;

    ngOnInit(): void {
        if (this._pendingContent) {
            this._isPending = true;
        }
    }

    ngAfterContentInit(): void {
        setTimeout(_ => {
            if (this._listOfTimeline && this._listOfTimeline.length) {
                const listArray = this._listOfTimeline.toArray();
                listArray[listArray.length - 1].lastItem = true;
            }
        });
    }
}

