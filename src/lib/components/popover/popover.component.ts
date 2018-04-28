import {
    AnimationEvent,
} from '@angular/animations';
import {
    ConnectedOverlayDirective,
    ConnectedOverlayPositionChange,
    ConnectionPositionPair,
    OverlayOrigin,
    CdkConnectedOverlay
} from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output, Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {fadeAnimation} from '../../core/animation/fade-animations';
import {DEFAULT_4_POSITIONS, POSITION_MAP} from '../../core/overlay/overlay-position-map';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/operators/merge';
import {mapTo} from 'rxjs/operators/mapTo';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {DropDownDirective} from '../dropdown/dropdown.directive';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';


@Component({
    selector: 'fz-popover',
    encapsulation: ViewEncapsulation.None,
    animations: [
        fadeAnimation
    ],
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements AfterViewInit {
    @Input() nzTitle: string;
    @Input() nzContent;

    @Input() nzOverlayClassName = '';
    @Input() nzMouseEnterDelay = 0.15; // Unit: second
    @Input() nzMouseLeaveDelay = 0.1; // Unit: second
    @Output() nzVisibleChange: EventEmitter<boolean> = new EventEmitter();
    @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;
    @ViewChild('overlay') overlay: ConnectedOverlayDirective;
    @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;

    // overlayOrigin: OverlayOrigin;
    @ViewChild('origin') overlayOrigin;

    visibleSource = new BehaviorSubject<boolean>(false);
    visible$: Observable<boolean> = this.visibleSource.asObservable();

    private _clickHide = true;

    @Input()
    set nzClickHide(value: boolean) {
        this._clickHide = coerceBooleanProperty(value);
    }

    get nzClickHide(): boolean {
        return this._clickHide;
    }

    @Input()
    set panelOpen(value: boolean) {
        // this.isOpen = coerceBooleanProperty(value);
        const visible = coerceBooleanProperty(value);
        if (this.visibleSource.value !== visible) {
            this.visibleSource.next(visible);
            this.nzVisibleChange.emit(visible);
        }
    }

    get panelOpen(): boolean {
        // return this.isOpen;
        return this.visibleSource.value;
    }

    @Input()
    set nzTrigger(value: string) {
        this._trigger = value;
        this._hasBackdrop = this._trigger === 'click';
    }

    get nzTrigger(): string {
        return this._trigger;
    }

    _prefix = 'ant-popover-placement';
    _hasBackdrop = false;
    _positions: ConnectionPositionPair[] = [...DEFAULT_4_POSITIONS];
    _classMap = {};
    _placement = 'top';
    _trigger = 'hover';

    private delayTimer; // Timer for delay enter/leave


    // ----------------------
    _triggerWidth = 0;

    // ---------------------


    @Input()
    set nzPlacement(value: string) {
        if (value !== this._placement) {
            this._placement = value;
            this._positions.unshift(POSITION_MAP[this.nzPlacement] as ConnectionPositionPair);
        }
    }

    get nzPlacement(): string {
        return this._placement;
    }

    // Manually force updating current overlay's position
    updatePosition(): void {
        if (this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    }

    onPositionChange($event: ConnectedOverlayPositionChange): void {
        console.log($event);
        for (const key in POSITION_MAP) {
            if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[key])) {
                this.nzPlacement = key;
                break;
            }
        }
        this.setClassMap();
        /** TODO may cause performance problem */
        this._cdr.detectChanges();
    }

    show(): void {
        if (!this.isContentEmpty()) {
            this._setTriggerWidth();
            this.panelOpen = true;
        }
    }

    hide(): void {
        this.panelOpen = false;
    }

    /*_afterVisibilityAnimation(e: AnimationEvent): void {
        if (e.toState === 'false' && !this.nzVisible) {
            this.nzVisibleChange.emit(false);
        }
        if (e.toState === 'true' && this.nzVisible) {
            this.nzVisibleChange.emit(true);
        }
    }*/

    setClassMap(): void {
        this._classMap = {
            [this.nzOverlayClassName]: true,
            [`${this._prefix}-${this._placement}`]: true
        };
    }

    setOverlayOrigin(origin: OverlayOrigin): void {
        this.overlayOrigin = origin;
    }

    constructor(private _renderer: Renderer2, private _cdr: ChangeDetectorRef) {
    }

    private isContentEmpty(): boolean {
        // return this.nzTemplate ? !(this.nzTemplate.elementRef.nativeElement as HTMLElement).hasChildNodes() : this.nzTitle === '';
        return (this.nzTemplate || this.nzContent) ? false : (this.nzTitle === '' || this.nzTitle == null);
        // Pity, can't detect whether nzTemplate is empty due to can't get it's content before shown up
    }


    _onPositionChange(position: ConnectedOverlayPositionChange): void {
        // console.log(position);
        // this._dropDownPosition = position.connectionPair.originY;
    }

    ngAfterViewInit(): void {
        if (this.nzTrigger === 'hover') {
            let overlayElement;
            this._renderer.listen(
                this.overlayOrigin.elementRef.nativeElement, 'mouseenter', () =>
                    this.delayEnterLeave(true, true, this.nzMouseEnterDelay)
            );
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'mouseleave', () => {
                this.delayEnterLeave(true, false, this.nzMouseLeaveDelay);
                if (this.overlay.overlayRef && !overlayElement) {
                    // NOTE: we bind events under "mouseleave" due to the overlayRef is only created after
                    // the overlay was completely shown up
                    overlayElement = this.overlay.overlayRef.overlayElement;
                    this._renderer.listen(overlayElement, 'mouseenter', () => this.delayEnterLeave(false, true));
                    this._renderer.listen(overlayElement, 'mouseleave', () => this.delayEnterLeave(false, false));
                }
            });
        } else if (this.nzTrigger === 'focus') {
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'focus', () => this.show());
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'blur', () => this.hide());
        } else if (this.nzTrigger === 'click') {
            this._renderer.listen(this.overlayOrigin.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
                this.show();
            });
        }
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

    private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
        // console.log('delayEnterLeave', isOrigin, isEnter, delay);
        if (this.delayTimer) { // Clear timer during the delay time
            window.clearTimeout(this.delayTimer);
            this.delayTimer = null;
        } else if (delay > 0) {
            this.delayTimer = window.setTimeout(() => {
                this.delayTimer = null;
                isEnter ? this.show() : this.hide();
            }, delay * 1000);
        } else {
            isEnter && isOrigin ? this.show() : this.hide();
            // [Compatible] The "isOrigin" is used due to the tooltip will not hide immediately (may caused by the fade-out animation)
        }
    }

    _clickDropDown($event: MouseEvent): void {
        console.log('_clickDropDown');
        $event.stopPropagation();
        if (this.nzClickHide) {
            this.hide();
        }
    }


}
