import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NoticeItem} from '../notice-item';

@Component({
    selector: 'fz-notice-list',
    templateUrl: './notice-list.component.html',
    styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent {
    @Input() data: NoticeItem;
    @Output() select = new EventEmitter<any>();
    @Output() clear = new EventEmitter<string>();

    onSelect(item: any) {
        this.select.emit({
            title: this.data.title,
            item: item
        });
    }

    onClear() {
        this.clear.emit(this.data.title);
    }
}
