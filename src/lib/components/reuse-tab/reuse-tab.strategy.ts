import {RouteReuseStrategy, ActivatedRouteSnapshot} from '@angular/router';
import {ReuseTabService} from './reuse-tab.service';
import {Optional} from '@angular/core';

export class ReuseTabStrategy implements RouteReuseStrategy {
    constructor(@Optional() private srv: ReuseTabService) {
        console.log('ReuseTabStrategy create...');
    }

    // 是否允许复用路由
    /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldDetach(route);
    }

    // 当路由离开时会触发，存储路由
    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    store(route: ActivatedRouteSnapshot, handle: {}): void {
        this.srv.store(route, handle);
    }

    // 是否允许还原路由
    /** 若 path 在缓存中有的都认为允许还原路由 */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldAttach(route);
    }

    //  获取存储路由
    /** 从缓存中获取快照，若无则返回nul */
    retrieve(route: ActivatedRouteSnapshot): {} {
        return this.srv.retrieve(route);
    }

    // 进入路由触发，是否同一路由时复用路由
    /** 进入路由触发，判断是否同一路由 */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return this.srv.shouldReuseRoute(future, curr);
    }

}
