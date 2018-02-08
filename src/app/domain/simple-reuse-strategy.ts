import {
    RouteReuseStrategy,
    DefaultUrlSerializer,
    ActivatedRouteSnapshot,
    DetachedRouteHandle
} from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

    // _cacheRouters: { [key: string]: any } = {};
    public static handlers: { [key: string]: DetachedRouteHandle } = {};

    private static waitDelete: string;

    // 是否允许复用路由
    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    // 当路由离开时会触发，存储路由
    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete === this.getRouteUrl(route)) {
            // 如果待删除是当前路由则不存储快照
            SimpleReuseStrategy.waitDelete = null;
            return;
        }
        SimpleReuseStrategy.handlers[this.getRouteUrl(route)] = handle;

        /**
         * this._cacheRouters[route.routeConfig.path] = {
            snapshot: route,
            handle: handle
        };
         */
    }

    // 是否允许还原路由
    /** 若 path 在缓存中有的都认为允许还原路由 */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // return !!route.routeConfig && !!SimpleReuseStrategy.handlers[route.routeConfig.path];
        return !!SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    //  获取存储路由
    /** 从缓存中获取快照，若无则返回nul */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log(route);
        if (!route.routeConfig) {
            return null;
        }

        // return SimpleReuseStrategy.handlers[route.routeConfig.path];
        return SimpleReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    // 进入路由触发，是否同一路由时复用路由
    /** 进入路由触发，判断是否同一路由 */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // 有些页面虽然是用的同一个路由，但是有可能是参数不一样
        return future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params);
    }

    // 获取路由的从主路由开始的路径，相当于location.pathname，然后把其中的  "/"字符换成了下划线。存储路由和判断路由都是用的这个方法的返回值来判断。
    private getRouteUrl(route: ActivatedRouteSnapshot) {
        return route['_routerState'].url.replace(/\//g, '_');
    }

    public deleteRouteSnapshot(name: string): void {
        /**
         * 路由快照是在离开这个路由的时候才会被记录，打开新的标签页而且没有切换标签的情况下，快照并没有记录,即SimpleReuseStrategy.handlers[name]= null，
         * 处理关闭标签页的事件里删除快照显然就有问题了，因为这个时候你快照还没生成，怎么能删除呢，而且标签一关闭跳到其它标签页的时候，这里又触发了快照的保存。
         */
        if (SimpleReuseStrategy.handlers[name]) {
            delete SimpleReuseStrategy.handlers[name];
        } else {
            SimpleReuseStrategy.waitDelete = name;
        }
    }
}
