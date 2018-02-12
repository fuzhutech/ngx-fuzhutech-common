import {Component} from '@angular/core';

@Component({
    selector: 'fz-header-icon',
    templateUrl: './header-icon.component.html',
    styleUrls: ['./header-icon.component.scss']
})
export class HeaderIconComponent {

    loading = true;

    change() {
        setTimeout(() => this.loading = false, 500);
    }

}
