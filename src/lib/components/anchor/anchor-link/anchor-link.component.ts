import {
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Input, OnDestroy, OnInit,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';

import {AnchorComponent} from '../anchor.component';

@Component({
    selector: 'fz-link',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './anchor-link.component.html',
    styleUrls: ['./anchor-link.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[class.fz-anchor-link]': 'true',
        'style': 'display:block'
    }
})
export class AnchorLinkComponent implements OnInit, OnDestroy {

    @Input() nzHref = '#';

    titleStr = '';
    titleTpl: TemplateRef<void>;

    @Input()
    set nzTitle(value: string | TemplateRef<void>) {
        if (value instanceof TemplateRef) {
            this.titleTpl = value;
        } else {
            this.titleStr = value;
        }
    }

    @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

    @HostBinding('class.fz-anchor-link') class = true;

    @HostBinding('class.fz-anchor-link-active') active = false;

    /*@HostListener('click')
    _onClick(): void {
        this._anchorComp.scrollTo(this);
    }*/

    constructor(public el: ElementRef, private anchorComp: AnchorComponent) {
    }

    ngOnInit(): void {
        this.anchorComp.registerLink(this);
    }

    goToClick(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this.anchorComp.handleScrollTo(this);
    }

    ngOnDestroy(): void {
        this.anchorComp.unregisterLink(this);
    }
}
