import {
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';

import {AnchorComponent} from '../anchor.component';

@Component({
    selector: 'fz-link',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './anchor-link.component.html',
    styleUrls: ['./anchor-link.component.scss'],
})
export class AnchorLinkComponent {

    @Input() nzHref: string;

    @Input() nzTitle: string;

    @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

    @HostBinding('class.ant-anchor-link') class = true;

    @HostBinding('class.ant-anchor-link-active') active = false;

    @HostListener('click')
    _onClick(): void {
        this._anchorComp.scrollTo(this);
    }

    constructor(public el: ElementRef, private _anchorComp: AnchorComponent) {
        this._anchorComp.add(this);
    }

    goToClick(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
        this._anchorComp.scrollTo(this);
        // return false;
    }
}
