import {
    AfterViewInit,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    Optional,
    Renderer2,
    SimpleChanges,
    ViewContainerRef,
} from '@angular/core';
import {PopoverComponent} from './popover.component';

@Directive({
    selector: '[fzPopover]',
})
export class PopoverDirective implements AfterViewInit {

    @HostBinding('class.ant-tooltip-open') isTooltipOpen;

    private popover: PopoverComponent;
    private isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created
    private delayTimer; // Timer for delay enter/leave

    constructor(
        public elementRef: ElementRef,
        private hostView: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        @Optional() popover: PopoverComponent) {

        this.popover = popover;
        // Support faster tooltip mode: <a nz-tooltip="xxx"></a>. [NOTE] Used only under NzTooltipDirective currently.
        if (!this.popover) {
            const factory = this.resolver.resolveComponentFactory(PopoverComponent);
            this.popover = this.hostView.createComponent(factory).instance;
            this.isDynamicTooltip = true;
        }
        this.popover.setOverlayOrigin(this);
    }

    ngAfterViewInit(): void {
        if (this.popover.nzTrigger === 'hover') {
            let overlayElement;
            this.renderer.listen(
                this.elementRef.nativeElement, 'mouseenter', () =>
                    this.delayEnterLeave(true, true, this.popover.nzMouseEnterDelay)
            );
            this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
                this.delayEnterLeave(true, false, this.popover.nzMouseLeaveDelay);
                if (this.popover.overlay.overlayRef && !overlayElement) {
                    // NOTE: we bind events under "mouseleave" due to the overlayRef is only created after
                    // the overlay was completely shown up
                    overlayElement = this.popover.overlay.overlayRef.overlayElement;
                    this.renderer.listen(overlayElement, 'mouseenter', () => this.delayEnterLeave(false, true));
                    this.renderer.listen(overlayElement, 'mouseleave', () => this.delayEnterLeave(false, false));
                }
            });
        } else if (this.popover.nzTrigger === 'focus') {
            this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
            this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
        } else if (this.popover.nzTrigger === 'click') {
            this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
                this.show();
            });
        }
    }

    private show(): void {
        this.popover.show();
        this.isTooltipOpen = true;
    }

    private hide(): void {
        this.popover.hide();
        this.isTooltipOpen = false;
    }

    private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
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
}
