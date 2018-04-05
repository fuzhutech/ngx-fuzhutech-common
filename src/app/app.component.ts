import {Component, ElementRef, HostBinding, Inject, OnInit, ViewChild} from '@angular/core';
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
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    /*host: {
        '[class]': 'myapp-light-theme'
    }*/
})
export class AppComponent implements OnInit {
    darkTheme = false;
    _sidebarOpen = true;

    // @HostBinding('class') componentCssClass = 'myapp-light-theme';

    constructor(private overlayContainer: OverlayContainer,
                private activatedRoute: ActivatedRoute,
                @Inject(DOCUMENT) private doc: any) {

        // this.menuService.add(appData.menu as Menu[]);
        this.switchTheme(false);
    }

    ngOnInit() {
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;


        const bodyEl = this.doc.querySelector('body');
        const removeArr = [];
        for (let i = 0; i < bodyEl.classList.length; i++) {
            if (bodyEl.classList[i].startsWith('theme-')) {
                removeArr.push(bodyEl.classList[i]);
            }
        }


        if (dark) {
            // this.componentCssClass = 'myapp-dark-theme';

            this.doc.body.classList.remove('myapp-light-theme');
            this.doc.body.classList.add('myapp-dark-theme');

            /**
             * 由于某些组件（如菜单、选择、对话框等）在一个全局覆盖容器中，这些组件需要受主题CSS类选择器的影响,
             * 需要额外的步骤将全局样式类添加到全局覆盖容器中。
             */
            this.overlayContainer.getContainerElement().classList.remove('myapp-light-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            // this.componentCssClass = 'myapp-light-theme';

            this.doc.body.classList.remove('myapp-dark-theme');
            this.doc.body.classList.add('myapp-light-theme');

            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-light-theme');
        }
    }

    toggleSidebar() {
        this._sidebarOpen = !this._sidebarOpen;
    }


}

