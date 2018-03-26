import {Component, ContentChild, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'fz-timeline-pending',
    templateUrl: './timeline-pending.component.html',
    styleUrls: ['./timeline-pending.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimelinePendingComponent implements OnInit {
    _custom = false;

    @ContentChild('custom') _customContent: TemplateRef<void>;
    @Input() color = 'blue';

    ngOnInit(): void {
        if (this._customContent) {
            this._custom = true;
        }
    }

}
