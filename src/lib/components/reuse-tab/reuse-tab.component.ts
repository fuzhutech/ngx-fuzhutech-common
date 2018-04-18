import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    ElementRef,
    Renderer2,
    Inject
} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {ReuseTabService} from './reuse-tab.service';
import {Menu, MenuService, ModuleInfo} from '../../core/layout/menu.service';
import {MatTabChangeEvent} from '@angular/material';


@Component({
    selector: 'fz-reuse-tab',
    templateUrl: './reuse-tab.component.html',
    styleUrls: ['./reuse-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReuseTabComponent implements OnInit, OnDestroy {

    private _max: number;
    @Input()
    set max(value: any) {
        this._max = coerceNumberProperty(value);
    }

    // _tabList: { url: string, title: string, [key: string]: any }[] = [];
    _tabList: { url: string, title: string, reuse: boolean, isSelected: boolean }[] = [];
    _selectedIndex = 0;

    private sub$: Subscription;
    private moduleInfo: ModuleInfo;

    constructor(public srv: ReuseTabService,
                private menuService: MenuService,
                private cd: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute,
                private el: ElementRef,
                private render: Renderer2,
                @Inject(DOCUMENT) private doc: any) {
    }

    ngOnInit(): void {

        // 模块菜单数据变化
        // todo: 后期要不要更改为监控ModuleService.change
        this.menuService.change
            .subscribe(
                (value: ModuleInfo) => {
                    this.clear();
                    this.moduleInfo = value;
                    this.srv.menuList = value.menuList || [];
                }
            );

        // 路由变化
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((value: NavigationEnd) => {
                // todo: 判断是否需要生成导航标签
                const nextUrl = this.router.url;
                const url = value.urlAfterRedirects;
                this.setSelectedTab(url);
            });
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }
    }

    handleSelection(event: MatTabChangeEvent) {
        const item = this._tabList[event.index];
        // (!item.isSelected)判断避免由于remove和url变化引起的重复动作
        if (item && (!item.isSelected) && item.url) {
            this.router.navigateByUrl(item.url);
        }
    }

    handleRemove(idx: number) {
        const item = this._tabList[idx];
        if (!this.srv.remove(item.url)) {
            return false;
        }
        const newTabList = this._tabList.filter((value, index) => index !== idx);
        let indexToSelect = this._selectedIndex;
        if (idx < this._selectedIndex) {
            // 选择标签index往前移动一位，但页面url没变
            indexToSelect = this._selectedIndex - 1;
            this._tabList = newTabList;
            this._selectedIndex = indexToSelect;
        } else if (idx > this._selectedIndex) {
            // 选择标签index不变，页面url不变
            this._tabList = newTabList;
            this._selectedIndex = indexToSelect;
        } else if (idx === this._selectedIndex) {
            // 关闭当前页面

            if (idx === this._tabList.length - 1) {
                // 关闭最后一页，默认选择前一页,url改变
                if (this._tabList.length > 1) {
                    indexToSelect = idx - 1;

                    // 改变url页面
                    newTabList[indexToSelect].isSelected = true;
                    this._tabList = newTabList;
                    this._selectedIndex = indexToSelect;
                    this.router.navigateByUrl(newTabList[indexToSelect].url);
                } else {
                    // 关闭仅有的一页
                    this._tabList = [];
                    const moduleUrl = this.moduleInfo.path.substring(0, this.moduleInfo.path.length - 1);
                    this.router.navigateByUrl(moduleUrl).catch(err => console.log(err));
                }
            }
            if (idx < this._tabList.length - 1) {
                // 非最后一页，选择后一页,url改变
                indexToSelect = idx;

                // 改变url页面
                newTabList[indexToSelect].isSelected = true;
                this._tabList = newTabList;
                this._selectedIndex = indexToSelect;
                this.router.navigateByUrl(newTabList[indexToSelect].url);
            }
        }

        // this._tabList.splice(idx, 1);

        this.cd.markForCheck();
    }

    handleRemoveOther(idx: number) {
        this._tabList = [this._tabList.find(w => w.url === this.router.url)];
        this.srv.clear();
    }

    handleRemoveAll(idx: number) {
        this.clear();
        const moduleUrl = this.moduleInfo.path.substring(0, this.moduleInfo.path.length - 1);
        this.router.navigateByUrl(moduleUrl).catch(err => console.log(err));
    }

    private clear() {
        // this._tabList = [this._tabList.find(w => w.url === this.router.url)];
        this._tabList = [];
        this.srv.clear();
    }

    private setSelectedTab(url: string) {
        const newTabList = this._tabList.filter(item => item.reuse === true);
        let index = newTabList.findIndex(w => w.url === url);
        this._tabList.forEach(tab => {
            tab.isSelected = false;
        });
        if (index === -1) {
            const info = this.srv.getTabInfo(url, ReuseTabService.getTruthRoute(this.route.snapshot));
            const item = {url: url, title: info.title, reuse: info.reuse, isSelected: true};
            newTabList.push(item);
            index = newTabList.length - 1;
        } else {
            this._tabList[index].isSelected = true;
        }
        this._tabList = newTabList;
        this._selectedIndex = index;

        this.cd.markForCheck();
        console.log(this._tabList);
    }


}
