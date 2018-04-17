import {
    Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Input, ElementRef,
    Renderer2, Inject, HostListener, OnDestroy
} from '@angular/core';
import {getDate} from 'date-fns';
import {Menu, MenuService} from '../../core/layout/menu.service';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'fz-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() list: Menu[] = [];
    selected: Menu = null;
    // private change$: Subscription;

    constructor(private menuSrv: MenuService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        /*this.change$ = <any>this.menuSrv.change.subscribe(res => {
            this.list = res;
            this.cd.detectChanges();
        });*/
    }

    ngOnDestroy(): void {
        /*if (this.change$) {
            this.change$.unsubscribe();
        }*/
    }

    onSelect(event) {
        if (this.selected !== event) {
            if (this.selected) {
                this.selected._selected = false;
            }
            this.selected = event;
        }
    }
}

