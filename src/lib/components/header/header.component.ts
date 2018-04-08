import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'fz-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    @Output() toggleSidebar = new EventEmitter<void>();
    @Output() toggleDarkTheme = new EventEmitter<boolean>();
    @Input() homeText = '';

    constructor() {
        //
    }

    ngOnInit() {
    }

    openSidebar() {
        this.toggleSidebar.emit();
    }

    onChage(checked: boolean) {
        this.toggleDarkTheme.emit(checked);
    }

    logout() {
        //
    }

}
