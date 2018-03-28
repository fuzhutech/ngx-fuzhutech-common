import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../../lib/components/reuse-tab/title.service';
import {NavigationEnd, Router} from '@angular/router';
import {MenuService} from '../../lib/components/reuse-tab/menu.service';

@Component({
    selector: 'fz-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

    _sidebarOpen = true;

    @ViewChild('sidebarContainerElement') sidebarContainerElement: ElementRef;

    constructor(private router: Router, private titleService: TitleService, private menuService: MenuService) {
    }

    ngOnInit() {
        this.router.events.filter(evt => evt instanceof NavigationEnd)
            .subscribe(() => this.titleService.setTitle());
    }

    get containerStyle() {
        const sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
        return {'width': this._sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : 'calc(100% - 10px)'};
    }

}
