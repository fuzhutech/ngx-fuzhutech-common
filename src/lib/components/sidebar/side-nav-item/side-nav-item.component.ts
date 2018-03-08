import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu} from '../../reuse-tab/menu.service';

@Component({
    selector: 'fz-side-nav-item',
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent implements OnInit {

    @Input() item: Menu;
    @Output() select = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    onItemClick(item: Menu) {
        const pItem = item.__parent;

        if (pItem && pItem.children) {
            pItem.children.forEach((child: Menu) => {
                if (child !== this.item) {
                    child._open = false;
                }
            });
        }

        /*while (pItem) {
            pItem._open = true;
            pItem = pItem.__parent;
        }*/

        item._open = !item._open;
    }

    onSelectClick(item: Menu) {
        // console.log('onSelectClick');
        item._selected = true;
        this.select.emit(item);
    }

}
