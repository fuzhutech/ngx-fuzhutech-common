import {
    Component,
    Input,
    Output,
    OnChanges,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    EventEmitter,
    OnInit,
    SimpleChanges,
    SimpleChange,
    OnDestroy,
    ElementRef,
    Renderer2,
    Inject
} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {filter, debounceTime, take, first} from 'rxjs/operators';
import {coerceNumberProperty, coerceBooleanProperty} from '@angular/cdk/coercion';
import {ReuseTabService} from './reuse-tab.service';
import {ReuseTabCached, ReuseTabNotify, ReuseTabMatchMode} from './interface';
import {Menu} from '../../core/layout/menu.service';


@Component({
    selector: 'fz-reuse-tab',
    templateUrl: './reuse-tab.component.html',
    styleUrls: ['./reuse-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReuseTabComponent implements OnInit, OnChanges, OnDestroy {

    _menuList: Menu[] = [];
    @Input() set menuList(value) {
        this._menuList = value;
        if (this.srv) {
            this.srv.menuList = value;
        }
    }

    get menuList() {
        return this._menuList;
    }

    private sub$: Subscription;
    tabList: { url: string, title: string, [key: string]: any }[] = [];
    selectedIndex = 0;

    /** 允许最多复用多少个页面 */
    @Input()
    get max() {
        return this._max;
    }

    set max(value: any) {
        this._max = coerceNumberProperty(value);
    }

    private _max: number;

    /** 允许关闭 */
    @Input()
    get allowClose() {
        return this._allowClose;
    }

    set allowClose(value: any) {
        this._allowClose = coerceBooleanProperty(value);
    }

    private _allowClose = true;

    /** 切换时回调 */
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    /** 关闭回调 */
    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    constructor(public srv: ReuseTabService,
                private cd: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute,
                private el: ElementRef,
                private render: Renderer2,
                @Inject(DOCUMENT) private doc: any) {
    }

    private gen(url?: string) {
        if (!url) {
            url = this.srv.getUrl(this.route.snapshot);
        }
        console.log('gen', url);
        const ls = [...this.srv.items].map((item: ReuseTabCached, index: number) => {
            return {
                url: item.url,
                title: item.customTitle || item.title,
                index
            };
        });

        const idx = ls.findIndex(w => w.url === url);
        if (idx !== -1) {
            this.selectedIndex = idx;
        } else {
            ls.push({
                url,
                title: this.srv.getTitle(url, this.srv.getTruthRoute(this.route.snapshot)),
                index: -1
            });
            this.selectedIndex = ls.length;
        }

        this.tabList = ls;
        this.cd.markForCheck();
    }

    handleSelection(event) {
        console.log(event);
        const item = this.tabList[event.index];
        if (!item || !item.url) {
            return;
        }
        this.router.navigateByUrl(item.url);
        this.change.emit(item);
    }

    private removeByUrl(url: string): string {
        const removeIdx = this.tabList.findIndex(w => w.url === url);
        if (removeIdx === -1) {
            return null;
        }

        this.remove(removeIdx);
        return this.tabList[Math.min(removeIdx, this.tabList.length - 1)].url;
    }

    remove(idx: number) {
        const item = this.tabList[idx];
        if (!this.srv._remove(item)) {
            return false;
        }

        this.tabList.splice(idx, 1);

        this.cd.markForCheck();

        this.close.emit(item);
    }

    removeOther(idx: number) {
        this.tabList = [this.tabList.find(w => w.url === this.router.url)];
        this.srv.clear();
        this.close.emit(null);
    }

    removeAll(idx: number) {
        this.tabList = [];
        this.srv.clear();
        this.close.emit(null);
    }

    clear() {
        this.tabList = [this.tabList.find(w => w.url === this.router.url)];
        this.srv.clear();
        this.close.emit(null);
    }

    ngOnInit(): void {

        const route$ = this.router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        );
        this.sub$ = <any>combineLatest(this.srv.change, route$).pipe(
            debounceTime(200)
        ).subscribe(([res]: [any]) => {
            console.log(res);
            let nextUrl = this.router.url;
            if (res && res.active === 'remove' && res.url) {
                nextUrl = this.removeByUrl(res.url);
                if (nextUrl === null) {
                    return;
                }
            }
            console.log('combineLatest(this.srv.change, route$)  gen');
            this.gen(nextUrl);
        });

        /*const title$ = this.srv.change.pipe(
            filter(w => w && w.active === 'title'),
            first()
        ).subscribe(res => {
            this.gen(this.router.url);
            title$.unsubscribe();
        });

        console.log('ngOnInit  gen');
        this.gen();*/
    }

    ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
        if (changes.max) {
            this.srv.max = this.max;
        }

        this.cd.markForCheck();
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }
    }
}
