import {Component, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, Renderer2, ViewChild} from '@angular/core';
import {coerceNumberProperty, coerceBooleanProperty} from '@angular/cdk/coercion';
import {NoticeItem} from './notice-item';
import {DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP} from '../../core/overlay/overlay-position-map';
import {ConnectionPositionPair, ConnectedOverlayPositionChange, CdkConnectedOverlay} from '@angular/cdk/overlay';
import {NzPlacement} from '../dropdown/dropdown.component';
import {dropDownAnimation} from '../../core/animation/dropdown-animations';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {mapTo} from 'rxjs/operators/mapTo';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/operators/merge';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'fz-notice-icon',
    templateUrl: './notice-icon.component.html',
    styleUrls: ['./notice-icon.component.scss'],
    animations: [
        dropDownAnimation
    ],
})
export class NoticeIconComponent implements AfterViewInit, OnDestroy {
    @Input() data: NoticeItem[] = [];

    @Input() nzTrigger: 'click' | 'contextmenu' = 'click';

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

    @Output() _visibleChange = new Subject<boolean>();
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

    @ViewChild('origin') overlayOrigin;
    @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;

    _triggerWidth = 0;
    _dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
    _subscription: Subscription;

    constructor(private _renderer: Renderer2, private _changeDetector: ChangeDetectorRef) {
        this.placement = 'bottomRight';
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

    ngAfterViewInit(): void {
        let mouse$: Observable<boolean>;
        if (this.nzTrigger === 'click') {
            mouse$ = fromEvent(this.overlayOrigin.elementRef.nativeElement, 'click').pipe(mapTo(true));
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
            });
        }
        if (this.nzTrigger === 'contextmenu') {
            mouse$ = fromEvent(this.overlayOrigin.elementRef.nativeElement, 'contextmenu').pipe(mapTo(true));
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'contextmenu', (e) => {
                e.preventDefault();
            });
        }
        const observable$ = mouse$.pipe(merge(this._visibleChange));
        this._startSubscribe(observable$);
    }

    _startSubscribe(observable$: Observable<boolean>): void {
        this._subscription = observable$.pipe(debounceTime(50))
            .subscribe((visible: boolean) => {
                if (visible) {
                    this._setTriggerWidth();
                }
                if (this.panelOpen !== visible) {
                    this.panelOpen = visible;
                    this.visibleChange.emit(this.panelOpen);
                }
                this._changeDetector.markForCheck();
            });
    }

    _setTriggerWidth(): void {
        this._triggerWidth = this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        /** should remove after https://github.com/angular/material2/pull/8765 merged **/
        if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
            this._cdkOverlay.overlayRef.updateSize({
                minWidth: this._triggerWidth
            });
        }
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

}

