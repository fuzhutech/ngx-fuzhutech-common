import {
    ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Optional, Output, Self,
    ViewChild
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {CdkConnectedOverlay} from '@angular/cdk/overlay';
import {NgControl} from '@angular/forms';
import {ReuseTabMenuComponent} from '../reuse-tab-menu/reuse-tab-menu.component';

@Component({
    selector: 'fz-reuse-tab-label',
    templateUrl: './reuse-tab-label.component.html',
    styleUrls: ['./reuse-tab-label.component.scss']
})
export class ReuseTabLabelComponent implements OnInit, OnDestroy {
    /** Whether or not the overlay panel is open. */
    private _panelOpen = false;

    /** Emits whenever the component is destroyed. */
    private _destroy = new Subject<void>();

    /** The last measured value for the trigger's client bounding rect. */
    _triggerRect: ClientRect;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     */
    _offsetY = 50;

    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    _positions = [
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
        },
    ];

    /** Trigger that opens the select. */
    @ViewChild('trigger') trigger: ElementRef;

    /** Panel containing the reuse-tab-menu-items. */
    // @ViewChild('panel') panel: ElementRef;

    /** Overlay pane containing the reuse-tab-menu-items. */
    @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;

    @Input() allowClose = true;
    @Input() tab;
    @Input() index;

    @Output() closeLabelPage: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeOtherLabelPage: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeAllLabelPage: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _ngZone: NgZone,
                @Self() @Optional() public ngControl: NgControl) {
        console.log(this.ngControl);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        // this.stateChanges.complete();
    }

    /** Whether or not the overlay panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** Toggles the overlay panel open or closed. */
    toggle(event: Event): void {
        event.preventDefault();
        this.panelOpen ? this.close() : this.open();
    }


    /** Opens the overlay panel. */
    open(): void {
        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        this._panelOpen = true;
        this._changeDetectorRef.markForCheck();
    }

    /** Closes the overlay panel and focuses the host element. */
    close(): void {
        if (this._panelOpen) {
            this._panelOpen = false;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    _onAttached(): void {
    }

    closeLabelPageClick() {
        console.log('closeLabelPageClick');
        this._panelOpen = false;
        this.closeLabelPage.emit(this.index);
    }

    closeOtherLabelPageClick() {
        this._panelOpen = false;
        this.closeOtherLabelPage.emit(this.index);
    }

    closeAllLabelPageClick() {
        this._panelOpen = false;
        this.closeAllLabelPage.emit(this.index);
    }
}
