import {
    Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Input, ElementRef,
    Renderer2, Inject, HostListener, OnDestroy
} from '@angular/core';
import {getDate} from 'date-fns';
import {Menu, MenuService} from '../reuse-tab/menu.service';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'fz-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    /*host: {
        '[class.aside]': 'true'
    },*/
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {

    @Output() navClick = new EventEmitter();
    today = 'day';

    // private rootEl: HTMLDivElement;
    // private floatingEl: HTMLDivElement;
    // private bodyEl: HTMLBodyElement;
    list: Menu[] = [];
    selectedMenu: Menu = null;
    selectedMenu2: Menu = null;
    selectedMenu3: Menu = null;
    selected: Menu = null;
    private change$: Subscription;

    @Input() autoCloseUnderPad = true;

    private route$: Subscription;

    constructor(private menuSrv: MenuService,
                // public settings: SettingsService,
                private router: Router,
                el: ElementRef,
                private render: Renderer2,
                private cd: ChangeDetectorRef,
                @Inject(DOCUMENT) private doc: any) {
        // this.rootEl = el.nativeElement as HTMLDivElement;
    }

    onNavClick() {
        this.navClick.emit();
    }

    ngOnInit() {
        this.today = `day${getDate(new Date())}`;

        // this.bodyEl = this.doc.querySelector('body');
        // this.menuSrv.openedByUrl(this.router.url);
        this.genFloatingContainer();
        this.change$ = <any>this.menuSrv.change.subscribe(res => {
            this.list = res;
            this.cd.detectChanges();


            this.list.forEach((item: Menu) => {
                if (item.children) {
                    item.children.forEach((child1: Menu) => {
                            // console.log(child1.text, child1.children, child1.children.length, child1._type);
                        }
                    );
                }
                // console.log(item.children);
            });
        });
        this.installUnderPad();
    }

    private floatingAreaClickHandle(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        /*if (this.settings.layout.collapsed !== true) {
            return;
        }*/
        const linkNode = (e.target as Element);
        if (linkNode.nodeName !== 'A') {
            return;
        }
        let url: string = linkNode.getAttribute('href');
        if (url) {
            if (url.startsWith('#')) {
                url = url.slice(1);
            }
            this.router.navigateByUrl(url);
        }
        this.hideAll();
        return false;
    }

    genFloatingContainer() {
        /*if (this.floatingEl) {
            this.floatingEl.remove();
            this.floatingEl.removeEventListener('click', this.floatingAreaClickHandle.bind(this));
        }
        this.floatingEl = this.render.createElement('div');
        this.floatingEl.classList.add(FLOATINGCLS + '-container');
        this.floatingEl.addEventListener('click', this.floatingAreaClickHandle.bind(this), false);
        this.bodyEl.appendChild(this.floatingEl);*/
    }

    private genSubNode(linkNode: HTMLLinkElement, item: Menu): HTMLUListElement {
        /*const id = `_sidebar-nav-${item.__id}`;
        let node = this.floatingEl.querySelector('#' + id) as HTMLUListElement;
        if (node) {
            return node;
        }
        node = linkNode.nextElementSibling.cloneNode(true) as HTMLUListElement;
        node.id = id;
        node.classList.add(FLOATINGCLS);
        node.addEventListener('mouseleave', () => {
            node.classList.remove(SHOWCLS);
        }, false);
        this.floatingEl.appendChild(node);
        return node;*/
        // todo: floatingEl
        return null;
    }

    private hideAll() {
        // todo: floatingEl
        /*
        const allNode = this.floatingEl.querySelectorAll('.' + FLOATINGCLS);
        for (let i = 0; i < allNode.length; i++) {
            allNode[i].classList.remove(SHOWCLS);
        }*/
    }

    // calculate the node position values.
    private calPos(linkNode: HTMLLinkElement, node: HTMLUListElement) {
        const rect = linkNode.getBoundingClientRect();
        // bug: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14721015/
        /*const scrollTop = Math.max(this.doc.documentElement.scrollTop, this.bodyEl.scrollTop);
        const top = rect.top + scrollTop,
            left = rect.right + 5;
        node.style.top = `${top}px`;
        node.style.left = `${left}px`;*/
    }

    showSubMenu(e: MouseEvent, item: Menu) {
        // console.log('showSubMenu', item);
        // todo: setting
        // if (this.settings.layout.collapsed !== true) {
        if (1 > 0) {
            return;
        }
        e.preventDefault();
        const linkNode = (e.target as Element);
        if (linkNode.nodeName !== 'A') {
            return;
        }
        this.genFloatingContainer();
        const subNode = this.genSubNode(linkNode as HTMLLinkElement, item);
        this.hideAll();
        // subNode.classList.add(SHOWCLS);
        this.calPos(linkNode as HTMLLinkElement, subNode);
    }

    toggleOpen(item: Menu) {
        // console.log('toggleOpen', item);
        this.menuSrv.visit((i, p) => {
            if (i !== item) {
                i._open = false;
            }
        });
        let pItem = item.__parent;
        while (pItem) {
            pItem._open = true;
            pItem = pItem.__parent;
        }
        item._open = !item._open;
        this.cd.markForCheck();
    }


    toggleOpen1(item: Menu) {
        this.selectedMenu = item;
        // this.cd.markForCheck();
    }

    toggleOpen2(item: Menu) {
        this.selectedMenu2 = item;
        // this.cd.markForCheck();
    }

    toggleOpen3(item: Menu) {
        this.selectedMenu3 = item;
        // this.cd.markForCheck();
    }

    @HostListener('document:click', ['$event.target'])
    onClick() {
        this.hideAll();
    }

    ngOnDestroy(): void {
        if (this.change$) {
            this.change$.unsubscribe();
        }
        if (this.route$) {
            this.route$.unsubscribe();
        }
    }

    // region: Under pad

    private installUnderPad() {
        if (!this.autoCloseUnderPad) {
            return;
        }
        this.route$ = this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                this.underPad();
            }
        });
        this.underPad();
    }

    private underPad() {
        if (!this.autoCloseUnderPad) {
            return;
        }
        // todo: setting
        /*if (window.innerWidth < 992 && !this.settings.layout.collapsed) {
            this.settings.setLayout('collapsed', true);
        }*/
    }

    // endregion

    onselect(event) {
        if (this.selected !== event) {
            if (this.selected) {
                this.selected._selected = false;
            }
            this.selected = event;
        }
    }
}

