import {Injectable, OnDestroy, Optional, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, DetachedRouteHandle, ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Menu, MenuService} from './menu.service';
import {ReuseTabCached, ReuseTabMatchMode, ReuseTabNotify} from './interface';
import {getResponseURL} from '@angular/http/src/http_utils';

@Injectable()
export class ReuseTabService implements OnDestroy {
    private _max = 10;
    private _debug = false;
    private _mode = ReuseTabMatchMode.Menu;
    private _excludes: RegExp[] = [];
    private _cachedChange: BehaviorSubject<ReuseTabNotify> = new BehaviorSubject<ReuseTabNotify>(null);
    private _cached: ReuseTabCached[] = [];
    private _titleCached: { [url: string]: string } = {};
    private _hookCached: { [url: string]: boolean } = {};
    private removeBuffer: string;
    private curUrl: string;

    // region: public

    menuList: Menu[] = [];


    /** 允许最多复用多少个页面，取值范围 `2-100` */
    set max(value: number) {
        this._max = Math.min(Math.max(value, 2), 100);
        for (let i = this._cached.length; i > this._max; i--) {
            this._cached.pop();
        }
    }

    /** 设置匹配模式 */
    set mode(value: ReuseTabMatchMode) {
        this._mode = value;
    }

    /** 设置Debug模式 */
    set debug(value: boolean) {
        this._debug = value;
    }

    /** 排除规则，限 `mode=URL` */
    set excludes(values: RegExp[]) {
        if (!values) {
            return;
        }
        this._excludes = values;
    }

    /** 获取指定路径缓存所在位置，`-1` 表示无缓存 */
    index(url: string): number {
        return this._cached.findIndex(w => w.url === url);
    }

    /** 获取指定路径缓存是否存在 */
    exists(url: string): boolean {
        return this.index(url) !== -1;
    }

    /** 获取指定路径缓存 */
    get(path: string): ReuseTabCached {
        return path ? this._cached.find(w => w.url === path) || null : null;
    }

    private destroy(_handle: any) {
        if (_handle && _handle.componentRef && _handle.componentRef.destroy) {
            _handle.componentRef.destroy();
        }
    }

    private di(...args) {
        if (!this._debug || !console) {
            return;
        }
        // tslint:disable-next-line:no-console
        console.warn(...args);
    }

    /**
     * 根据URL移除标签
     */
    remove(url: string) {
        this.di('remove tag', url);
        this._cachedChange.next({active: 'remove', url});
    }

    /**
     * 移除指定路径缓存
     * @private
     */
    _remove(data: any): boolean {
        let url = data;
        if (typeof data !== 'string') {
            url = data.url;
        }
        this.removeBuffer = url;
        const idx = this.index(url);
        const item = idx !== -1 ? this._cached[idx] : null;
        if (item) {
            this.destroy(item._handle);
            this._cached.splice(idx, 1);
            delete this._titleCached[url];
        }
        return true;
    }

    /**
     * 清除所有缓存
     */
    clear() {
        this.di('clear all catch');
        this.removeBuffer = null;
        this._cached.forEach(v => this.destroy(v._handle));
        this._cached = [];
        this._cachedChange.next({active: 'clear'});
    }

    /**
     * 清除标题缓存
     */
    clearTitleCached() {
        this._titleCached = {};
    }

    /** 获取已缓存的路由 */
    get items() {
        return this._cached;
    }

    /** 获取当前缓存的路由总数 */
    get count() {
        return this._cached.length;
    }

    /** 订阅缓存变更通知 */
    get change(): Observable<ReuseTabNotify> {
        return this._cachedChange.asObservable();
    }

    /** 设置当前页标题 */
    set title(value: string) {
        if (!value) {
            return;
        }
        if (!this.curUrl) {
            this.curUrl = this.getUrl(this.injector.get(ActivatedRoute).snapshot);
        }
        this._titleCached[this.curUrl] = value;
        this.di('update current tag title', value);
        this._cachedChange.next({active: 'title', title: value});
    }

    // endregion

    // region: privates

    /** @private */
    _clearRemoveBuffer() {
        this.removeBuffer = null;
    }

    // endregion

    constructor(private injector: Injector) {
        console.log('ReuseTabService create...');
    }

    /** @private */
    getTitle(url: string, route?: ActivatedRouteSnapshot): string {
        if (this._titleCached[url]) {
            return this._titleCached[url];
        }
        if (route && route.data && (route.data.reuseTitle || route.data.title)) {
            return route.data.reuseTitle || route.data.title;
        }

        const item = this.getMenu(url);
        return item ? item.text : url;
    }

    getTruthRoute(route: ActivatedRouteSnapshot) {
        let next = route;
        while (next.firstChild) {
            next = next.firstChild;
        }
        return next;
    }

    getUrl(route: ActivatedRouteSnapshot): string {
        let next = this.getTruthRoute(route);
        const segments = [];
        while (next) {
            segments.push(next.url.join('/'));
            next = next.parent;
        }
        const url = '/' + segments.filter(i => i).reverse().join('/');
        return url;
    }

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

    /*private runHook(method: string, url: string, comp: any) {
        console.log('runHook', url, comp);
        if (this._hookCached[url]) {
            return;
        }
        this._hookCached[url] = true;
        setTimeout(() => {
            if (comp.instance && comp.instance[method]) {
                comp.instance[method]();
            }
            this._hookCached[url] = false;
        }, 100);
    }*/

    /** @private */
    getClosable(url: string, route?: ActivatedRouteSnapshot): boolean {
        if (route && route.data && typeof route.data.reuseClosable !== 'undefined') {
            return route.data.reuseClosable;
        }

        const menu = this._mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
        if (menu && typeof menu.reuseClosable !== 'undefined') {
            return menu.reuseClosable;
        }

        return true;
    }

    ngOnDestroy(): void {
        this._cached = null;
        this._cachedChange.unsubscribe();
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
                const futureUrl = this.getUrl(future);
                const currUrl = this.getUrl(curr);
                url = futureUrl;
                ret = futureUrl === currUrl;
            }
        }
        this.curUrl = ret ? '' : (url || this.getUrl(curr));
        this.di('#shouldReuseRoute', this.getUrl(future), this.getUrl(curr), ret, future, curr);
        return ret;
    }

    private shouldReuse(route: ActivatedRouteSnapshot): boolean {
        const url = this.getUrl(route);

        // 待移除的指定路径缓存
        if (url === this.removeBuffer) {
            return false;
        }

        // 路由配置数据
        if (route.data && typeof route.data.reuse === 'boolean') {
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

    /**
     * 确定此路由（及其子树）是否应该分离以便稍后重用，若 `true` 会触发detachAndStoreRouteSubtree,调用 `store`
     * @param {ActivatedRouteSnapshot} route
     * @returns {boolean}
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren || route.routeConfig.children) {
            return false;
        }
        this.di('#shouldDetach', this.getUrl(route), this.shouldReuse(route));
        return this.shouldReuse(route);
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
        if (this.count >= this._max) {
            this._cached.shift();
        }
        const url = this.getUrl(route);
        console.log(url);
        const idx = this.index(url);

        const item: ReuseTabCached = {
            customTitle: this._titleCached[url],
            title: this.getTitle(url, route),
            // closable: this.getClosable(url, _snapshot),
            url,
            _snapshot: route,
            _handle: handle
        };
        if (idx === -1) {
            this._cached.push(item);
        } else {
            this._cached[idx] = item;
        }
        this._clearRemoveBuffer();

        this.di('#store', url, idx === -1 ? '[new]' : '[override]');

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
        const url = this.getUrl(route);
        const data = this.get(url);
        const ret = !!(data && data._handle);
        this.di('#shouldAttach', url, ret);
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
        const url = this.getUrl(route);
        const data = this.get(url);
        const ret = (data && data._handle) || null;
        this.di('#retrieve', url, ret);
        /*if (ret && ret.componentRef) {
            this.runHook('_onReuseInit', url, ret.componentRef);
        }*/
        return ret;
    }

    // endregion
}
