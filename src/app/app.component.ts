import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SimpleReuseStrategy} from './domain/simple-reuse-strategy';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Menu, MenuService} from '../lib/components/reuse-tab/menu.service';
import {TitleService} from '../lib/components/reuse-tab/title.service';
import {filter} from 'rxjs/operator/filter';

@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    darkTheme = false;

    constructor(private overlayContainer: OverlayContainer,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: TitleService,
                private menuService: MenuService) {

        // this.menuService.add(appData.menu as Menu[]);
    }

    ngOnInit() {
        this.router.events.filter(evt => evt instanceof NavigationEnd)
            .subscribe(() => this.titleService.setTitle());
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;
        if (dark) {
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
        }
    }
}

