import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'fz-avatar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges {

    private _el: HTMLElement;
    private _prefixCls = 'fz-avatar';
    private _classList: string[] = [];

    _hasText = false;

    _textStyles: {};

    _isSrcExist = true;

    _hasIcon = false;

    @Input() shape: 'square' | 'circle' = 'circle';

    @Input() size: 'small' | 'large' | 'default' = 'default';

    @Input() text: string;

    @Input() src: string;

    @Input() icon: string;

    @ViewChild('textEl') _textEl: ElementRef;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._el = _elementRef.nativeElement;
        this._renderer.addClass(this._el, this._prefixCls);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._hasText = !this.src && !!this.text;
        this._hasIcon = !this.src && !!this.icon;

        this._setClassMap()._notifyCalc();
    }

    private _setClassMap(): this {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            this.size && `${this._prefixCls}-size-${this.size}`,
            this.shape && `${this._prefixCls}-shape-${this.shape}`,
            this.icon && `${this._prefixCls}-icon`,
            this.src && `${this._prefixCls}-image`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        });
        return this;
    }

    _imgError(): void {
        this._isSrcExist = false;
        // TODO(i): need force remove [nzSrc] if broken image?
        this._hasIcon = false;
        this._hasText = false;
        if (this.icon) {
            this._hasIcon = true;
        } else if (this.text) {
            this._hasText = true;
        }
        this._setClassMap()._notifyCalc();
    }

    private _calcStringSize(): void {
        if (!this._hasText) {
            return;
        }

        const el = this._textEl && this._textEl.nativeElement;
        if (!el) {
            return;
        }

        const childrenWidth = el.offsetWidth;
        const avatarWidth = this._el.getBoundingClientRect().width;
        const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
        if (scale === 1) {
            this._textStyles = {};
        } else {
            this._textStyles = {
                transform: `scale(${scale})`,
                position: 'absolute',
                display: 'inline-block',
                left: `calc(50% - ${Math.round(childrenWidth / 2)}px)`
            };
        }
    }

    private _notifyCalc(): this {
        // If use ngAfterViewChecked, always demands more computations, so......
        setTimeout(() => {
            this._calcStringSize();
        });
        return this;
    }


}

