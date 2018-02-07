import {
    Component,
    ContentChild,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';

import {
    animate,
    style,
    transition,
    trigger,
} from '@angular/animations';

import {toBoolean} from '../../util/convert';

@Component({
    selector: 'fz-badge',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('enterLeave', [
            transition('void => *', [
                style({opacity: 0}),
                animate('0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46)')
            ]),
            transition('* => void', [
                style({opacity: 1}),
                animate('0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46)')
            ])
        ])
    ],
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    host: {
        '[class.ant-badge]': 'true'
    }
})
export class BadgeComponent implements OnInit {
    private _showDot = false;
    private _showZero = false;
    count: number;
    maxNumberArray;
    countArray = [];
    countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    @ContentChild('content') content: TemplateRef<void>;

    @HostBinding('class.ant-badge-not-a-wrapper')
    get setNoWrapper(): boolean {
        return !this.content;
    }

    // @HostBinding('class.ant-badge') badgeStyle = true;

    @Input() nzOverflowCount = 99;

    @Input()
    set nzShowZero(value: boolean) {
        this._showZero = toBoolean(value);
    }

    get nzShowZero(): boolean {
        return this._showZero;
    }

    @Input()
    set nzDot(value: boolean) {
        this._showDot = toBoolean(value);
    }

    get nzDot(): boolean {
        return this._showDot;
    }

    @Input() nzText: string;
    @Input() nzStyle;
    @Input() @HostBinding('class.ant-badge-status') nzStatus: string;

    @Input()
    set nzCount(value: number) {
        if (value < 0) {
            this.count = 0;
        } else {
            this.count = value;
        }
        this.countArray = this.count.toString().split('');
    }

    get nzCount(): number {
        return this.count;
    }

    ngOnInit(): void {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
}
