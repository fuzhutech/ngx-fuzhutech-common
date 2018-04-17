import {
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input, NgZone,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {CarouselContentDirective} from './carousel-content.directive';
import {Subscription} from 'rxjs/Subscription';
import {first} from 'rxjs/operator/first';

@Component({
    selector: 'fz-carousel',
    // preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    host: {
        '[class.fz-carousel]': 'true'
    }
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
    private _autoPlay = false;
    private _dots = true;
    activeIndex = 0;
    transform = 'translate3d(0px, 0px, 0px)';
    interval;

    @ContentChildren(CarouselContentDirective) slideContents: QueryList<CarouselContentDirective>;
    @ViewChild('slickList') slickList: ElementRef;
    @ViewChild('slickTrack') slickTrack: ElementRef;
    @Output() nzAfterChange: EventEmitter<number> = new EventEmitter();
    @Output() nzBeforeChange: EventEmitter<{ from: number; to: number }> = new EventEmitter();

    get nextIndex(): number {
        return this.activeIndex < this.slideContents.length - 1 ? (this.activeIndex + 1) : 0;
    }

    get prevIndex(): number {
        return this.activeIndex > 0 ? (this.activeIndex - 1) : (this.slideContents.length - 1);
    }

    @Input()
    set nzDots(value: boolean) {
        this._dots = coerceBooleanProperty(value);
    }

    get nzDots(): boolean {
        return this._dots;
    }

    @Input()
    set nzAutoPlay(value: boolean) {
        this._autoPlay = coerceBooleanProperty(value);
        this.setUpAutoPlay();
    }

    get nzAutoPlay(): boolean {
        return this._autoPlay;
    }

    setActive(content: CarouselContentDirective, i: number): void {
        if (this.slideContents && this.slideContents.length) {
            this.setUpAutoPlay();
            const beforeIndex = this.slideContents.toArray().findIndex(slide => slide.isActive);
            this.nzBeforeChange.emit({from: beforeIndex, to: i});
            this.activeIndex = i;

            this.transform = `translate3d(${-this.activeIndex * this.elementRef.nativeElement.offsetWidth}px, 0px, 0px)`;
            this.slideContents.forEach(slide => slide.isActive = slide === content);
            this.nzAfterChange.emit(i);
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.renderContent();
        }, 100);
        // this.renderContent();
    }

    renderContent(): void {
        if (this.slideContents && this.slideContents.length) {
            setTimeout(() => {
                this.slideContents.first.isActive = true;
            }, 100);
            this.slideContents.forEach((content, i) => {
                content.width = this.elementRef.nativeElement.offsetWidth;


                content.fadeMode = false;
                content.left = null;
                content.top = null;
            });

            this.renderer.removeStyle(this.slickTrack.nativeElement, 'height');
            this.renderer.removeStyle(this.slickList.nativeElement, 'height');
            this.renderer.removeStyle(this.slickTrack.nativeElement, 'width');
            this.renderer.setStyle(this.slickTrack.nativeElement, 'width',
                `${this.slideContents.length * this.elementRef.nativeElement.offsetWidth}px`);

            this.setUpAutoPlay();
        }
    }

    setUpAutoPlay(): void {
        this.clearInterval();
        if (this.nzAutoPlay) {
            this.interval = setInterval(_ => {
                this.setActive(this.slideContents.toArray()[this.nextIndex], this.nextIndex);
            }, 3000);
        }
    }

    clearInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    next(): void {
        this.setActive(this.slideContents.toArray()[this.nextIndex], this.nextIndex);
    }

    pre(): void {
        this.setActive(this.slideContents.toArray()[this.prevIndex], this.prevIndex);
    }

    goTo(index: number): void {
        if (index >= 0 && index <= this.slideContents.length - 1) {
            this.setActive(this.slideContents.toArray()[index], index);
        }
    }

    onKeyDown(e: KeyboardEvent): void {
        if (e.keyCode === 37) { // Left
            this.pre();
            e.preventDefault();
        } else if (e.keyCode === 39) { // Right
            this.next();
            e.preventDefault();
        }
    }

    constructor(public elementRef: ElementRef, private renderer: Renderer2, private zone: NgZone) {
    }

    ngOnDestroy(): void {
        this.clearInterval();
    }

}
