import {Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {coerceNumberProperty, coerceBooleanProperty} from '@angular/cdk/coercion';
import {NoticeItem} from './notice-item';
import {DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP} from '../../core/overlay/overlay-position-map';
import {ConnectionPositionPair, ConnectedOverlayPositionChange} from '@angular/cdk/overlay';
import {NzPlacement} from '../dropdown/dropdown.component';
import {dropDownAnimation} from '../../core/animation/dropdown-animations';

@Component({
    selector: 'fz-notice-icon',
    templateUrl: './notice-icon.component.html',
    styleUrls: ['./notice-icon.component.scss'],
    animations: [
        dropDownAnimation
    ],
})
export class NoticeIconComponent {
    @Input() data: NoticeItem[] = [];

    /** 图标上的消息总数 */
    @Input()
    get count() {
        return this._count;
    }

    set count(value: any) {
        this._count = coerceNumberProperty(value);
    }

    private _count: number;

    /** 图标不展示数字，只有一个小红点 */
    @Input()
    get dot() {
        return this._dot;
    }

    set dot(value: any) {
        this._dot = coerceBooleanProperty(value);
    }

    private _dot = false;

    /** 弹出卡片加载状态 */
    @Input()
    get loading() {
        return this._loading;
    }

    set loading(value: any) {
        this._loading = coerceBooleanProperty(value);
    }

    private _loading = false;

    @Output() select = new EventEmitter<any>();
    @Output() clear = new EventEmitter<string>();

    @Output() visibleChange = new EventEmitter<boolean>();

    private isOpen = false;

    @Input()
    set panelOpen(value: boolean) {
        this.isOpen = coerceBooleanProperty(value);
    }

    get panelOpen(): boolean {
        return this.isOpen;
    }

    private _placement: NzPlacement = 'bottomRight';
    _positions: ConnectionPositionPair[] = [...DEFAULT_DROPDOWN_POSITIONS];

    @Input()
    set placement(value: NzPlacement) {
        this._placement = value;
        this._dropDownPosition = (this.placement.indexOf('top') !== -1) ? 'top' : 'bottom';
        this._positions.unshift(POSITION_MAP[this._placement] as ConnectionPositionPair);
    }

    get placement(): NzPlacement {
        return this._placement;
    }


    _triggerWidth = 0;
    _dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';

    constructor(private _cdr: ChangeDetectorRef) {
        this.placement = 'bottomRight';
    }

    _toggle() {
        this.panelOpen = !this.panelOpen;
        this.visibleChange.emit(this.panelOpen);
    }

    _close(): void {
        this.panelOpen = false;
        this.visibleChange.emit(this.panelOpen);
    }

    _onPositionChange(position: ConnectedOverlayPositionChange): void {
        console.log(position);
        this._dropDownPosition = position.connectionPair.originY;
    }

    _onSelect(i: any) {
        this.select.emit(i);
    }

    _onClear(title: string) {
        this.clear.emit(title);
    }

}

