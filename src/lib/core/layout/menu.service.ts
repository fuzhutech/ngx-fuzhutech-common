import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {share} from 'rxjs/operators';

export interface MenuData {
    /** 文本 */
    text: string;
    /** i18n主键 */
    i18n?: string;
    /** 是否菜单组 */
    group?: boolean;
    /** angular 路由 */
    link?: string;
    /** 外部链接 */
    externalLink?: string;
    /** 链接 target */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /** 图标 */
    icon?: string;
    /** 徽标数，展示的数字。（注：`group:true` 无效） */
    badge?: number;
    /** 徽标数，显示小红点 */
    badge_dot?: boolean;
    /** 徽标数，设置 Badge 颜色 （默认：error， 所有颜色值见：https://github.com/cipchk/ng-alain/blob/master/_documents/utils.md#色彩） */
    badge_status?: string;
    /** 是否隐藏 */
    hide?: boolean;
    /** ACL配置，若导入 `@delon/acl` 时自动有效 */
    acl?: any;
    /** 是否快捷菜单项 */
    shortcut?: boolean;
    /** 快捷菜单根节点 */
    shortcut_root?: boolean;
    /** 是否允许复用，需配合 `reuse-tab` 组件 */
    reuse?: boolean;
    /** 二级菜单 */
    children?: MenuData[];

    [key: string]: any;
}


export class Menu {
    /** 文本 */
    text: string;
    /** i18n主键 */
    i18n?: string;
    /** 是否菜单组 */
    group?: boolean;
    /** angular 路由 */
    link?: string;
    /** 外部链接 */
    externalLink?: string;
    /** 链接 target */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /** 图标 */
    icon?: string;
    /** 徽标数，展示的数字。（注：`group:true` 无效） */
    badge?: number;
    /** 徽标数，显示小红点 */
    badge_dot?: boolean;
    /** 徽标数，设置 Badge 颜色 （默认：error， 所有颜色值见：https://github.com/cipchk/ng-alain/blob/master/_documents/utils.md#色彩） */
    badge_status?: string;
    /** 是否隐藏 */
    hide?: boolean;
    /** ACL配置，若导入 `@delon/acl` 时自动有效 */
    acl?: any;
    /** 是否快捷菜单项 */
    shortcut?: boolean;
    /** 快捷菜单根节点 */
    shortcut_root?: boolean;
    /** 是否允许复用，需配合 `reuse-tab` 组件 */
    reuse?: boolean;
    /** 二级菜单 */
    children?: Menu[];
    /**
     * 菜单类型，无须指定由 Service 自动识别
     * 1：链接
     * 2：外部链接
     * 3：链接（子菜单）
     * @private
     */
    _type?: number;
    /**
     * 是否选中
     * @private
     */
    _selected?: boolean;
    /**
     * 是否隐藏菜单
     * @private
     */
    _hidden?: boolean;
    /**
     * 是否打开
     * @private
     */
    _open?: boolean;
    /**
     * @private
     */
    _depth?: number;

    [key: string]: any;

    setOpenState(value: boolean) {
        if (!value && this.children) {
            this.children.forEach((item: Menu) => {
                item.setOpenState(value);
            });
        }

        this._open = value;
    }
}

export interface ModuleInfo {
    name: string;
    path: string;
    menuList: Menu[];
}

@Injectable()
export class MenuService implements OnDestroy {
    private _change$: BehaviorSubject<ModuleInfo> = new BehaviorSubject<ModuleInfo>({name: '', path: '', menuList: []});
    private _root: Menu = Object.assign(new Menu(), {text: 'root', children: [], _depth: -1});
    private _shortcut: Menu = Object.assign(new Menu(), {text: '快捷菜单1', _depth: 0, children: []});
    private module: ModuleInfo;

    // private data: MenuData[] = [];

    constructor() {
        console.log('MenuService create...');
        this._root.setOpenState(false);
    }

    public get change(): Observable<ModuleInfo> {
        return this._change$.pipe(share());
    }

    public add(module: string, path: string, items: MenuData[]) {
        this.resume(module, path, items);
    }

    private inFn1(list: MenuData[], parentMenu: Menu, depth: number) {
        for (const item of list) {
            const menuItem: Menu = Object.assign(new Menu(), {
                text: item.text,
                group: item.group ? item.group : false,
                link: item.link ? item.link : '',
                externalLink: item.externalLink ? item.externalLink : '',
                target: item.target,
                icon: item.icon,
                acl: item.acl,
                shortcut: item.shortcut,
                shortcut_root: item.shortcut_root ? item.shortcut_root : false,
                reuse: item.reuse,
                _selected: false,
                _hidden: typeof item.hide === 'undefined' ? false : item.hide,
                _open: false,
                _depth: depth,
                badge_dot: item.badge ? item.badge_dot : false,
                badge_status: item.badge && item.badge_status ? item.badge_status : 'error',
                children: []
            });

            /**
             * 菜单类型，无须指定由 Service 自动识别
             * 0：主菜单组
             * 1：内部链接
             * 2：外部链接
             * 3：链接（子菜单）
             */
            if (item.group) {
                menuItem._type = 0;
            } else if (item.children && item.children.length > 0) {
                menuItem._type = 3;
            } else {
                menuItem._type = item.externalLink ? 2 : 1;
            }

            // shortcut_root
            if (item.shortcut_root) {
                menuItem._type = 3;
                /*const temp = this._root.children.shift();
                menuItem.children.push(...shortcut.children);
                shortcut.children.forEach((child: Menu) => {
                    child.__parent = menuItem;
                });*/
                this._shortcut = menuItem;
            }

            // shortcut
            parentMenu.children.push(menuItem);
            menuItem.__parent = parentMenu;

            if (item.shortcut === true && (item.link || item.externalLink)) {
                this._shortcut.children.push(menuItem);
            }

            if (item.children && item.children.length > 0) {
                this.inFn1(item.children, menuItem, depth + 1);
            }
        }
    }


    resume(module: string, path: string, items: MenuData[]) {
        this._root = Object.assign(new Menu(), {text: 'root', children: [], _depth: -1});
        this._shortcut = Object.assign(new Menu(), {text: '快捷菜单1', _depth: 0, children: []});
        this._root.children.push(this._shortcut);
        this.inFn1(items, this._root, 0);

        // 快捷菜单的深度序号重排
        const shortcutChilds = [];
        this._shortcut.children.forEach((item: Menu) => {
                const temp = Object.assign(new Menu(), item);
                shortcutChilds.push(temp);
                temp.__parent = this._shortcut;
            }
        );
        this._shortcut.children = shortcutChilds;
        // this.data.push(...items);
        // this.data = items;
        this.module = {name: module, path: path, menuList: this._root.children};
        this._change$.next(this.module);
    }

    ngOnDestroy(): void {
        if (this._change$) {
            this._change$.unsubscribe();
        }
    }
}
