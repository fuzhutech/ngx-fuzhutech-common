import {Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'fz-timeline-item',
    templateUrl: './timeline-item.component.html',
    styleUrls: ['./timeline-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimelineItemComponent implements OnInit {
    _custom = false;

    @ContentChild('custom') _customContent: TemplateRef<void>;
    @Input() color = 'blue';
    @Input() pending = false;

    public lastItem = false;


    ngOnInit(): void {
        if (this._customContent) {
            this._custom = true;
        }
    }

}
