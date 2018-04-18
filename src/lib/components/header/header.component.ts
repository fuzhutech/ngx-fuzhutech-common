import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input} from '@angular/core';
import {Router} from '@angular/router';

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

    constructor(private router: Router) {
        //
    }

    ngOnInit() {
    }

    onHomeClick() {
        this.router.navigate(['']).catch(err => console.log(err));
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
