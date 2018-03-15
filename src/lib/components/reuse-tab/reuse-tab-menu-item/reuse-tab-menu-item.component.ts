import {Component, Input, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {
    MatMenuItem, CanDisable, CanDisableRipple, mixinDisabled,
    mixinDisableRipple
} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {FocusableOption} from '@angular/cdk/a11y';

// Boilerplate for applying mixins to MatMenuItem.
/** @docs-private */
export class MatMenuItemBase {
}

export const _MatMenuItemMixinBase = mixinDisableRipple(mixinDisabled(MatMenuItemBase));


@Component({
    selector: 'fz-reuse-tab-menu-item',
    templateUrl: './reuse-tab-menu-item.component.html',
    styleUrls: ['./reuse-tab-menu-item.component.scss'],
    host: {
        'role': 'menuitem',
        'class': 'fz-reuse-tab-menu-item',
        '[class.mat-menu-item-highlighted]': '_highlighted',
        '[class.mat-menu-item-submenu-trigger]': '_triggersSubmenu',
        '[attr.tabindex]': '_getTabIndex()',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.disabled]': 'disabled || null',
        // '(click)': '_checkDisabled($event)',
        '(mouseenter)': '_emitHoverEvent()',
    }
})
export class ReuseTabMenuItemComponent
    // extends _MatMenuItemMixinBase
    implements FocusableOption/*, CanDisable, CanDisableRipple*/, OnDestroy {

    @Input() disabled = false;

    /** Stream that emits when the menu item is hovered. */
    _hovered: Subject<ReuseTabMenuItemComponent> = new Subject();

    /** Whether the menu item is highlighted. */
    _highlighted = false;

    /** Whether the menu item acts as a trigger for a sub-menu. */
    _triggersSubmenu = false;

    constructor(private _elementRef: ElementRef) {
        // super();
    }

    /** Focuses the menu item. */
    focus(): void {
        this._getHostElement().focus();
    }

    ngOnDestroy() {
        this._hovered.complete();
    }

    /** Used to set the `tabindex`. */
    _getTabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    /** Returns the host DOM element. */
    _getHostElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** Prevents the default element actions if it is disabled. */
    _checkDisabled(event: Event): void {
        console.log('_checkDisabled');
        if (this.disabled) {
            console.log('_checkDisabled1');
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** Emits to the hover stream. */
    _emitHoverEvent() {
        if (!this.disabled) {
            this._hovered.next(this);
        }
    }

    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string {
        const element: HTMLElement = this._elementRef.nativeElement;
        let output = '';

        if (element.childNodes) {
            const length = element.childNodes.length;

            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (let i = 0; i < length; i++) {
                if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                    output += element.childNodes[i].textContent;
                }
            }
        }

        return output.trim();
    }

}
