import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Menu} from '../../../core/layout/menu.service';

@Component({
    selector: 'fz-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['./side-nav-item.component.scss'],
    host: {
        '[class.nav-item-open]': 'item._open'
    }
})
export class SideNavItemComponent implements OnInit {

    @Input() item: Menu;
    @Output() select = new EventEmitter<any>();

    // @HostBinding('class.nav-item-open') itemOpen: boolean = this.item._open;

    constructor() {
    }

    ngOnInit() {
    }

    toggleSubMenu(item: Menu) {
        const pItem = item.__parent;

        if (pItem && pItem.children) {
            pItem.children.forEach((child: Menu) => {
                if (child !== this.item) {
                    child._open = false;
                    child.setOpenState(false);
                }
            });
        }

        /*while (pItem) {
            pItem._open = true;
            pItem = pItem.__parent;
        }*/

        item._open = !item._open;
        // this.itemOpen = item._open;
    }

    onSelectClick(item: Menu) {
        // console.log('onSelectClick');
        item._selected = true;
        this.select.emit(item);
    }

    getPaddingLeft(item) {
        const value = item._depth ? (item._depth + 1) * 16 : 16;
        return value + 'px';
    }

}
