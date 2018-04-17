import {Injectable, OnDestroy, Optional, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {Observable} from 'rxjs/Observable';
import {Menu} from '../../core/layout/menu.service';
import {ReuseTabCached, ReuseTabMatchMode, ReuseTabNotify} from './interface';

@Injectable()
export class ReuseTabService implements OnDestroy {

    private _cachedChange: BehaviorSubject<ReuseTabNotify> = new BehaviorSubject<ReuseTabNotify>(null);
    private _cached: ReuseTabCached[] = []; // 路由缓存
    // private _titleCached: { [url: string]: string } = {};

    /**
     * 路由快照是在离开这个路由的时候才会被记录，打开新的标签页而且没有切换标签的情况下，快照并没有记录,即_cached[index]= null，
     * 处理关闭标签页的事件里删除快照显然就有问题了，因为这个时候你快照还没生成，怎么能删除呢，而且标签一关闭跳到其它标签页的时候，这里又触发了快照的保存。
     */
    private removeBuffer: string;
    // private curUrl: string;

    menuList: Menu[] = [];

    // 排除规则，限 `mode=URL`
    private _excludes: RegExp[] = [];
    set excludes(values: RegExp[]) {
        if (!values) {
            return;
        }
        this._excludes = values;
    }

    // 允许最多复用多少个页面，取值范围 `2-100`
    private _max = 10;
    set max(value: number) {
        this._max = Math.min(Math.max(value, 2), 100);
        for (let i = this._cached.length; i > this._max; i--) {
            this._cached.pop();
        }
    }

    // 设置匹配模式
    private _mode = ReuseTabMatchMode.Menu;
    set mode(value: ReuseTabMatchMode) {
        this._mode = value;
    }

    static getTruthRoute(route: ActivatedRouteSnapshot) {
        let next = route;
        while (next.firstChild) {
            next = next.firstChild;
        }
        return next;
    }

    static getUrl(route: ActivatedRouteSnapshot): string {
        let next = this.getTruthRoute(route);
        const segments = [];
        while (next) {
            segments.push(next.url.join('/'));
            next = next.parent;
        }
        const url = '/' + segments.filter(i => i).reverse().join('/');
        return url;
    }

    constructor(private injector: Injector) {
        console.log('ReuseTabService create...');
    }

    ngOnDestroy(): void {
        this._cached = null;
        this._cachedChange.unsubscribe();
    }


    // 清除所有缓存
    public clear() {
        // this.di('clear all catch');
        this.removeBuffer = null;
        this._cached.forEach(v => this.destroy(v._handle));
        this._cached = [];
        this._cachedChange.next({active: 'clear'});
    }

    public getTitle(url: string, route?: ActivatedRouteSnapshot): string {
        /*if (this._titleCached[url]) {
            return this._titleCached[url];
        }*/
        if (route && route.data && (route.data.reuseTitle || route.data.title)) {
            return route.data.reuseTitle || route.data.title;
        }

        const item = this.getMenu(url);
        return item ? item.text : url;
    }


    public getTabInfo(url: string, route?: ActivatedRouteSnapshot): { title: string, reuse: boolean } {

        return {title: this.getTitle(url, route), reuse: this.getReuse(url, route)};
    }

    // 移除指定路径缓存
    public remove(url: string): boolean {
        this.removeBuffer = url;
        const idx = this._cached.findIndex(w => w.url === url);
        const item = idx !== -1 ? this._cached[idx] : null;
        if (item) {
            this.destroy(item._handle);
            this._cached.splice(idx, 1);
            // delete this._titleCached[url];
        }

        return true;
    }

    /** 订阅缓存变更通知
     get change(): Observable<ReuseTabNotify> {
        return this._cachedChange.asObservable();
    }*/


    private getMenu(url: string): Menu {
        const getMenuByLink = (list: Menu[]): Menu => {
            for (const item of list) {
                // console.log(item);

                if (item.link === url) {
                    return item;
                }

                if (item.children && item.children.length > 0) {
                    const temp = getMenuByLink(item.children);
                    if (temp) {
                        return temp;
                    }
                }
            }

            return null;
        };

        return getMenuByLink(this.menuList || []);
    }

    private destroy(_handle: any) {
        if (_handle && _handle.componentRef && _handle.componentRef.destroy) {
            _handle.componentRef.destroy();
        }
    }

    private getReuse(url: string, route: ActivatedRouteSnapshot): boolean {
        // 路由配置数据
        if (route && route.data && typeof route.data.reuse === 'boolean') {
            return route.data.reuse;
        }

        // 复用匹配模式
        if (this._mode === ReuseTabMatchMode.Menu) {  // 按菜单 `Menu` 配置

            // 是否存在对应的Menu配置信息
            const menu = this.getMenu(url);
            if (!menu) {
                return false;
            }

            /*  可复用：
             * - `{ text:'Dashboard' }`
             * - `{ text:'Dashboard', reuse: true }`
             *
             * 不可复用：
             * - `{ text:'Dashboard', reuse: false }`
             **/
            return menu.reuse !== false;

        } else if (this._mode === ReuseTabMatchMode.URL) {  // 对所有路由有效，可以配合 `excludes` 过滤无须复用路由
            if (url) {
                return -1 === this._excludes.findIndex(r => r.test(url));
            } else {
                return false;
            }
        } else {   // 按菜单 `Menu` 强制配置

            const menu = this.getMenu(url);
            if (!menu) {
                return false;
            }

            /*  可复用：
             * - `{ text:'Dashboard', reuse: true }`
             *
             * 不可复用：
             * - `{ text:'Dashboard' }`
             * - `{ text:'Dashboard', reuse: false }`
             */
            return menu.reuse && menu.reuse === true;
        }
    }

    // region: ReuseTabStrategy

    /**
     * 进入路由触发，判断是否同一路由时复用路由，确定是否应重用路由。
     * reuse an activated route that is currently displayed on the screen
     * @param {ActivatedRouteSnapshot} future
     * @param {ActivatedRouteSnapshot} curr
     * @returns {boolean}
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        let ret = future.routeConfig === curr.routeConfig;
        let url = '';
        if (ret) {
            const path = ((future.routeConfig && future.routeConfig.path) || '') as string;
            if (path.length > 0 && path.indexOf(':')) {
                const futureUrl = ReuseTabService.getUrl(future);
                const currUrl = ReuseTabService.getUrl(curr);
                url = futureUrl;
                ret = futureUrl === currUrl;
            }
        }
        // this.curUrl = ret ? '' : (url || ReuseTabService.getUrl(curr));
        // this.di('#shouldReuseRoute', this.getUrl(future), this.getUrl(curr), ret, future, curr);
        return ret;
    }

    private getShouldDetach(route: ActivatedRouteSnapshot, url: string): boolean {
        // 待移除的指定路径缓存
        if (url === this.removeBuffer) {
            return false;
        }

        return this.getReuse(url, route);
    }

    /**
     * 确定此路由（及其子树）是否应该分离以便稍后重用，若 `true` 会触发detachAndStoreRouteSubtree,调用 `store`
     * @param {ActivatedRouteSnapshot} route
     * @returns {boolean}
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren || route.routeConfig.children) {
            return false;
        }
        const url = ReuseTabService.getUrl(route);
        const ret = this.getShouldDetach(route, url);
        // this.di('#shouldDetach', url, ret);
        return ret;
    }

    /**
     * 当路由离开时会触发,存储分离的路由。按path作为key存储路由快照&组件当前实例对象
     * 存储空值`null` 应该删除先前存储的值。
     * @param {ActivatedRouteSnapshot} route
     * @param handle { componentRef, route, contexts } | null
     */
    store(route: ActivatedRouteSnapshot, handle: any) {
        if (!route.routeConfig || route.routeConfig.loadChildren || route.routeConfig.children) {
            return;
        }

        const url = ReuseTabService.getUrl(route);
        if (this.removeBuffer && this.removeBuffer === url) {
            // 如果待删除是当前路由则不存储快照
            this.removeBuffer = null;
            return;
        }
        const item: ReuseTabCached = {
            title: this.getTitle(url, route),
            url,
            _snapshot: route,
            _handle: handle
        };

        const idx = this._cached.findIndex(w => w.url === url);
        if (idx === -1) {
            if (this._cached.length >= this._max) {
                this._cached.shift();
            }
            this._cached.push(item);
        } else {
            this._cached[idx] = item;
        }
        this.removeBuffer = null;

        // this.di('#store', url, idx === -1 ? '[new]' : '[override]');

        /*if (handle && handle.componentRef) {
            console.log(handle);
            this.runHook('_onReuseDestroy', url, handle.componentRef);
        }*/

        this._cachedChange.next({active: 'add', item});
    }

    /**
     * 是否允许还原路由,决定是否允许应用缓存数据，确定这条路线（及其子树）应复位
     * @param {ActivatedRouteSnapshot} route
     * @returns {boolean}
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren || route.routeConfig.children) {
            return false;
        }
        const url = ReuseTabService.getUrl(route);
        const data = url ? this._cached.find(w => w.url === url) || null : null;
        const ret = !!(data && data._handle);
        // this.di('#shouldAttach', url, ret);
        return ret;
    }

    /**
     * 提取先前存储的复用数据,从缓存中获取快照，若无则返回nul
     * @param {ActivatedRouteSnapshot} route
     * @returns {{}}
     */
    retrieve(route: ActivatedRouteSnapshot): {} {
        if (!route.routeConfig || route.routeConfig.loadChildren || route.routeConfig.children) {
            return null;
        }
        const url = ReuseTabService.getUrl(route);
        const data = url ? this._cached.find(w => w.url === url) || null : null;
        const ret = (data && data._handle) || null;
        // this.di('#retrieve', url, ret);
        /*if (ret && ret.componentRef) {
            this.runHook('_onReuseInit', url, ret.componentRef);
        }*/
        return ret;
    }

    // endregion
}
