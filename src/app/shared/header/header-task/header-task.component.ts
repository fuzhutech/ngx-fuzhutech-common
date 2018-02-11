import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-header-task',
    templateUrl: './header-task.component.html',
    styleUrls: ['./header-task.component.scss']
})
export class HeaderTaskComponent {

    loading = true;

    change() {
        setTimeout(() => this.loading = false, 500);
    }

}


