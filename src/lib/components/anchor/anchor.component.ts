import {DOCUMENT} from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {coerceNumberProperty, coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subscription} from 'rxjs/Subscription';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {distinctUntilChanged} from 'rxjs/operators/distinctUntilChanged';
import {throttleTime} from 'rxjs/operators/throttleTime';

import {ScrollService} from '../../core/scroll/scroll.service';
import {AnchorLinkComponent} from './anchor-link/anchor-link.component';

interface Section {
    comp: AnchorLinkComponent;
    top: number;
}

const sharpMatcherRegx = /#([^#]+)$/;

@Component({
    selector: 'fz-anchor',
    // encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    templateUrl: './anchor.component.html',
    styleUrls: ['./anchor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnchorComponent implements OnDestroy, AfterViewInit {

    private links: AnchorLinkComponent[] = [];
    private animating = false;
    private target: Element = null;
    /** @private */
    scroll$: Subscription = null;
    /** @private */
    visible = false;
    /** @private */
    wrapperStyle: {} = {'max-height': '100vh'};
    @ViewChild('wrap') private wrap: ElementRef;
    @ViewChild('ink') private ink: ElementRef;

    // region: fields

    private _affix = true;

    @Input()
    set nzAffix(value: boolean) {
        this._affix = coerceBooleanProperty(value);
    }

    get nzAffix(): boolean {
        return this._affix;
    }

    private _bounds = 5;

    @Input()
    set nzBounds(value: number) {
        this._bounds = coerceNumberProperty(value);
    }

    get nzBounds(): number {
        return this._bounds;
    }

    private _offsetTop: number;

    @Input()
    set nzOffsetTop(value: number) {
        this._offsetTop = coerceNumberProperty(value);
        this.wrapperStyle = {
            'max-height': `calc(100vh - ${this._offsetTop}px)`
        };
    }

    get nzOffsetTop(): number {
        return this._offsetTop;
    }

    private _showInkInFixed = false;

    @Input()
    set nzShowInkInFixed(value: boolean) {
        this._showInkInFixed = coerceBooleanProperty(value);
    }

    get nzShowInkInFixed(): boolean {
        return this._showInkInFixed;
    }

    @Input()
    set nzTarget(el: Element) {
        this.target = el;
        this.registerScrollEvent();
    }

    @Output() nzClick: EventEmitter<string> = new EventEmitter();

    @Output() nzScroll: EventEmitter<AnchorLinkComponent> = new EventEmitter();

    // endregion

    /* tslint:disable-next-line:no-any */
    constructor(private scrollSrv: ScrollService, @Inject(DOCUMENT) private doc: any, private cd: ChangeDetectorRef) {
    }

    registerLink(link: AnchorLinkComponent): void {
        this.links.push(link);
    }

    unregisterLink(link: AnchorLinkComponent): void {
        this.links.splice(this.links.indexOf(link), 1);
    }

    private getTarget(): Element | Window {
        return this.target || window;
    }

    ngAfterViewInit(): void {
        this.registerScrollEvent();
    }

    ngOnDestroy(): void {
        this.removeListen();
    }

    private registerScrollEvent(): void {
        this.removeListen();
        this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(50), distinctUntilChanged())
            .subscribe(e => this.handleScroll());
        // 由于页面刷新时滚动条位置的记忆
        // 倒置在dom未渲染完成，导致计算不正确
        setTimeout(() => this.handleScroll());
    }

    private removeListen(): void {
        if (this.scroll$) {
            this.scroll$.unsubscribe();
        }
    }

    private getOffsetTop(element: HTMLElement): number {
        if (!element || !element.getClientRects().length) {
            return 0;
        }
        const rect = element.getBoundingClientRect();
        if (!rect.width && !rect.height) {
            return rect.top;
        }
        return rect.top - element.ownerDocument.documentElement.clientTop;
    }

    handleScroll(): void {
        if (this.animating) {
            return;
        }

        const sections: Section[] = [];
        const scope = (this.nzOffsetTop || 0) + this.nzBounds;
        this.links.forEach(comp => {
            const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = this.doc.getElementById(sharpLinkMatch[1]);
            if (target && this.getOffsetTop(target) < scope) {
                const top = this.getOffsetTop(target);
                sections.push({
                    top,
                    comp
                });
            }
        });

        this.visible = !!sections.length;
        if (!this.visible) {
            this.clearActive();
            this.cd.detectChanges();
        } else {
            const maxSection = sections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
            this.handleActive(maxSection.comp);
        }
    }

    private clearActive(): void {
        this.links.forEach(i => i.active = false);
    }

    private handleActive(comp: AnchorLinkComponent): void {
        this.clearActive();

        comp.active = true;
        this.cd.detectChanges();

        const linkNode = (comp.el.nativeElement as HTMLDivElement).querySelector('.ant-anchor-link-title') as HTMLElement;
        this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;

        this.nzScroll.emit(comp);
    }

    handleScrollTo(linkComp: AnchorLinkComponent): void {
        const el = this.doc.querySelector(linkComp.nzHref);
        if (!el) {
            return;
        }

        this.animating = true;
        const containerScrollTop = this.scrollSrv.getScroll(this.getTarget());
        const elOffsetTop = this.scrollSrv.getOffset(el).top;
        const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
        this.scrollSrv.scrollTo(this.getTarget(), targetScrollTop, null, () => {
            this.animating = false;
            this.handleActive(linkComp);
        });
        this.nzClick.emit(linkComp.nzHref);
    }
}
