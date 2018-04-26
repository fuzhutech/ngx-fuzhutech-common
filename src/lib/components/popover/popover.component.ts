import {
    AnimationEvent,
} from '@angular/animations';
import {
    ConnectedOverlayDirective,
    ConnectedOverlayPositionChange,
    ConnectionPositionPair,
    OverlayOrigin,
} from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {fadeAnimation} from '../../core/animation/fade-animations';
import {DEFAULT_4_POSITIONS, POSITION_MAP} from '../../core/overlay/overlay-position-map';
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'fz-popover',
    encapsulation: ViewEncapsulation.None,
    animations: [
        fadeAnimation
    ],
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
    @Input() nzTitle: string;
    @Input() nzContent;

    @Input() nzOverlayClassName = '';
    @Input() nzOverlayStyle = {};
    @Input() nzMouseEnterDelay = 0.15; // Unit: second
    @Input() nzMouseLeaveDelay = 0.1; // Unit: second
    @Output() nzVisibleChange: EventEmitter<boolean> = new EventEmitter();
    @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;
    @ViewChild('overlay') overlay: ConnectedOverlayDirective;

    overlayOrigin: OverlayOrigin;

    @Input()
    set nzVisible(value: boolean) {
        const visible = coerceBooleanProperty(value);
        if (this.visibleSource.value !== visible) {
            this.visibleSource.next(visible);
            this.nzVisibleChange.emit(visible);
        }
    }

    get nzVisible(): boolean {
        return this.visibleSource.value;
    }

    visibleSource = new BehaviorSubject<boolean>(false);
    visible$: Observable<boolean> = this.visibleSource.asObservable();

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
            this.nzVisible = true;
        }
    }

    hide(): void {
        this.nzVisible = false;
    }

    _afterVisibilityAnimation(e: AnimationEvent): void {
        if (e.toState === 'false' && !this.nzVisible) {
            this.nzVisibleChange.emit(false);
        }
        if (e.toState === 'true' && this.nzVisible) {
            this.nzVisibleChange.emit(true);
        }
    }

    setClassMap(): void {
        this._classMap = {
            [this.nzOverlayClassName]: true,
            [`${this._prefix}-${this._placement}`]: true
        };
    }

    setOverlayOrigin(origin: OverlayOrigin): void {
        this.overlayOrigin = origin;
    }

    constructor(private _cdr: ChangeDetectorRef) {
    }

    private isContentEmpty(): boolean {
        // return this.nzTemplate ? !(this.nzTemplate.elementRef.nativeElement as HTMLElement).hasChildNodes() : this.nzTitle === '';
        return (this.nzTemplate || this.nzContent) ? false : (this.nzTitle === '' || this.nzTitle == null);
        // Pity, can't detect whether nzTemplate is empty due to can't get it's content before shown up
    }
}
