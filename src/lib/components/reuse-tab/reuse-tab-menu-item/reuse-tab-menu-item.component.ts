import {Component, Input, OnInit} from '@angular/core';
import {MatMenuItem} from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'fz-reuse-tab-menu-item',
    templateUrl: './reuse-tab-menu-item.component.html',
    styleUrls: ['./reuse-tab-menu-item.component.scss'],
    host: {
        'role': 'menuitem',
        'class': 'mat-menu-item',
        '(click)': '_checkDisabled($event)',
        '(mouseenter)': '_emitHoverEvent()'
    }
})
export class ReuseTabMenuItemComponent implements OnInit {

    @Input() disabled = false;
    @Input() disableRipple = false;

    /** Stream that emits when the menu item is hovered. */
    _hovered: Subject<any> = new Subject();

    constructor() {
    }

    ngOnInit() {
    }

    /** Prevents the default element actions if it is disabled. */
    _checkDisabled(event: Event): void {
        if (this.disabled) {
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

}
