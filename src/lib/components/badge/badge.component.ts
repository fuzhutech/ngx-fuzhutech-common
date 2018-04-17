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
import {coerceBooleanProperty} from '@angular/cdk/coercion';

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
})
export class BadgeComponent implements OnInit {
    private _showDot = false;
    private _showZero = false;
    _count: number;
    @ContentChild('content') content: TemplateRef<void>;

    /**
     * 展示封顶的数字值
     * @type {number}
     */
    @Input() overflowCount = 99;

    /**
     * 当添加该属性时，当数值为 0 时，展示 Badge
     * @param {boolean} value
     */
    @Input()
    set showZero(value: boolean) {
        this._showZero = coerceBooleanProperty(value);
    }

    get showZero(): boolean {
        return this._showZero;
    }

    /**
     * 不展示数字，只有一个小红点
     * @param {boolean} value
     */
    @Input()
    set showDot(value: boolean) {
        this._showDot = coerceBooleanProperty(value);
    }

    get showDot(): boolean {
        return this._showDot;
    }

    /**
     * 在设置了 nzStatus的前提下有效，设置状态点的文本
     */
    @Input() text: string;

    /**
     * 设置 Badge 为状态点  'success', 'processing, 'default', 'error', 'warning'
     */
    @Input() status: 'info' | 'warning' | 'error' | 'success' = 'info';

    /**
     * 展示的数字，大于 nzOverflowCount 时显示为 nzOverflowCount+为 0 时隐藏
     * @param {number} value
     */
    @Input()
    set count(value: number) {
        if (value < 0) {
            this._count = 0;
        } else {
            this._count = value;
        }
    }

    get count(): number {
        return this._count;
    }


    ngOnInit(): void {

    }
}
