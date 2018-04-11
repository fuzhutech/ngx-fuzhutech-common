import {AfterViewInit, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild} from '@angular/core';
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
import {DOCUMENT} from '@angular/common';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {routeAnimation, routerFlyIn, routerTransition} from '../lib/core/animation/route-animations';

@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    /*host: {
        '[class]': 'myapp-light-theme'
    }*/
    animations: [
        trigger('queryAnimation', [
            transition('* => *', [
                query('h1', style({opacity: 0, color: 'red'})),
                query('.content', style({opacity: 0, color: 'green', width: '100px', height: '100px', border: '1px solid red'})),
                query('h1', animate(1000, style({opacity: 1, color: ' blue'}))),
                query('.content', animate(1000, style({opacity: 1, width: '50px', height: '100px', border: '10px solid green'})),
                    {optional: true}),
            ]),
            transition(':leave', [
                style({color: 'pink'}),
                animate(2000)
            ])
        ]),
        routerTransition,
        routerFlyIn,
        routeAnimation
    ]
})
export class AppComponent implements OnInit, AfterViewInit {
    darkTheme = false;
    _sidebarOpen = true;

    // router跳转动画所需参数
    routerState = true;
    routerStateCode = 'active';

    // @HostBinding('class') componentCssClass = 'myapp-light-theme';

    constructor(private overlayContainer: OverlayContainer,
                private activatedRoute: ActivatedRoute,
                @Inject(DOCUMENT) private doc: any,
                private router: Router) {

        // this.menuService.add(appData.menu as Menu[]);
        this.switchTheme(false);


        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // 每次路由跳转改变状态
                this.routerState = !this.routerState;
                this.routerStateCode = this.routerState ? 'active' : 'inactive';
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const _element: HTMLElement = document.getElementById('preLoader');
        setTimeout(() => {
            if (_element) {
                _element.style['display'] = 'none';
            }
        }, 0);
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

    goAnimate() {
        return true;
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

}

