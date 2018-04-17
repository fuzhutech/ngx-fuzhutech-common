import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ActivatedRoute, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';


@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    /*host: {
        '[class]': 'myapp-light-theme'
    }*/
})
export class AppComponent implements OnInit, AfterViewInit {
    darkTheme = false;
    _sidebarOpen = true;

    constructor(private overlayContainer: OverlayContainer,
                private activatedRoute: ActivatedRoute,
                @Inject(DOCUMENT) private doc: any,
                private router: Router) {
        this.switchTheme(false);
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
            this.doc.body.classList.remove('myapp-light-theme');
            this.doc.body.classList.add('myapp-dark-theme');

            /**
             * 由于某些组件（如菜单、选择、对话框等）在一个全局覆盖容器中，这些组件需要受主题CSS类选择器的影响,
             * 需要额外的步骤将全局样式类添加到全局覆盖容器中。
             */
            this.overlayContainer.getContainerElement().classList.remove('myapp-light-theme');
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
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

