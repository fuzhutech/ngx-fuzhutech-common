import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-transfer',
    templateUrl: './fz-demo-transfer.component.html',
    styleUrls: ['./fz-demo-transfer.component.scss']
})
export class FzDemoTransferComponent implements OnInit {

    list: any[] = [];

    constructor() {
    }

    ngOnInit() {
        for (let i = 0; i < 20; i++) {
            this.list.push({
                key: i.toString(),
                title: `content${i + 1}`,
                disabled: i % 3 < 1,
            });
        }

        [2, 3].forEach(idx => this.list[idx].direction = 'right');
    }

    select(ret: any) {
        console.log('nzSelectChange', ret);
    }

    change(ret: any) {
        console.log('nzChange', ret);
    }

}
