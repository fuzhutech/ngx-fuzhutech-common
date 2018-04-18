import {Component, ElementRef, Injectable, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MenuData, MenuService} from '../../core/layout/menu.service';
import {LayoutConfig} from './layout.config';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {TitleService} from '../../core/layout/title.service';


@Component({
    selector: 'fz-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    @ViewChild('sidebarContainerElement') sidebarContainerElement: ElementRef;
    @ViewChild('tabContainerElement') tabContainerElement: ElementRef;

    @Input() showHeader = true;
    @Input() showFooter = true;

    _sidebarOpen = true;
    @Input() set sidebarOpen(value) {
        if (this.tabContainerElement && (this.tabContainerElement.nativeElement.offsetWidth > 0)) {
            if (value) {
                // 展开侧边栏，导航栏减少宽度
                // this.screenWidth = this.el.nativeElement.offsetWidth;
                this.tabContainerWidth = this.tabContainerElement.nativeElement.offsetWidth;
            } else {
                // 收缩侧边栏，导航栏增加宽度
                this.tabContainerWidth = this.tabContainerElement.nativeElement.offsetWidth;
                if (this.sidebarContainerElement) {
                    this.sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
                }
            }
        }

        this._sidebarOpen = coerceBooleanProperty(value);
    }

    // screen,layout: full,default/undefined
    private _layout = 'default';
    // sidebar: none, left, right
    private _sidebar = 'left';

    get showSidebar(): boolean {
        if (this._layout === 'full') {
            return false;
        }
        return this._sidebar !== 'none';  // coerceBooleanProperty
    }

    // tab: none, top, right,left,bottom
    private _tab = 'top';

    get showReuseTab(): boolean {
        if (this._layout === 'full') {
            return false;
        }

        return this._tab !== 'none';
    }

    get contentContainerStyle() {
        return {};
    }

    private tabContainerWidth = -1;
    private sidebarWidth = -1;
    private width = -1;

    get tabContainerStyle() {
        if (this.tabContainerElement && (this.tabContainerElement.nativeElement.offsetWidth > 0)) {
            /*console.log('tabContainerStyle screenWidth:', this.el.nativeElement.offsetWidth,
                'tabContainerWidth:', this.tabContainerElement.nativeElement.offsetWidth);*/
            if (this._sidebarOpen) {
                // 收到展开侧边栏命令
                if (this.tabContainerWidth > 0) {

                    // 侧边栏已展开
                    if (this.sidebarContainerElement && (this.sidebarContainerElement.nativeElement.offsetWidth > 0)) {
                        const sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
                        const width = this.tabContainerWidth - sidebarWidth;
                        this.tabContainerWidth = -1;
                        return (width > 0) ? {'width': `${width}px`} : {};
                    } else {
                        // 侧边栏展开过程
                        const width = this.tabContainerWidth - this.sidebarWidth > 0 ?
                            this.tabContainerWidth - this.sidebarWidth : this.tabContainerWidth;
                        return {'width': `${width}px`};
                    }
                } else if (this.sidebarContainerElement && (this.sidebarContainerElement.nativeElement.offsetWidth > 0)) {
                    // 侧边栏日常已展开状态
                    // 代码前提，上级containerStyle，flex-direction: column
                    const sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
                    const screenWidth = this.el.nativeElement.offsetWidth;
                    this.width = screenWidth - sidebarWidth;

                    return {'width': `${this.width}px`};
                }
            } else {
                // 收到收缩侧边栏命令
                if (this.tabContainerWidth > 0) {
                    // 侧边栏已收缩
                    if (this.sidebarContainerElement && (this.sidebarContainerElement.nativeElement.offsetWidth === 0)) {
                        const screenWidth = this.el.nativeElement.offsetWidth;
                        this.tabContainerWidth = -1;
                        return {'width': `${screenWidth}px`};
                    } else {
                        // 侧边栏收缩过程
                        return {'width': `${this.tabContainerWidth}px`};
                    }
                } else {
                    // 侧边栏日常已收缩状态
                    const screenWidth = this.el.nativeElement.offsetWidth;
                    return {'width': `${screenWidth}px`};
                }
            }
        }

        return {};
    }

    private moduleList: Array<{ path: string, title: string, isSelect: boolean, menuData: MenuData[] }> = [];
    private selectModule: { path: string, title: string, isSelect: boolean, menuData: MenuData[] };

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                public menuService: MenuService,
                private menuConfig: LayoutConfig,
                private titleService: TitleService,
                private el: ElementRef) {
        // this.menuService.add(appMenuData.menu as MenuData[]);
    }

    private moduleDefiniens = [
        {path: '/showcase/', name: 'showcase', title: '示例', desc: '示例'},
        {path: '/pages/', name: 'pages', title: '页面', desc: '页面'},
        {path: '/', name: 'home', title: '', desc: '默认主页面'}
    ];

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .do((event: NavigationEnd) => {
                this.setModule(event.urlAfterRedirects);
            })
            .map(() => this.activatedRoute)
            .map(route => {
                // console.log(route);
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .do((route: ActivatedRoute) => {
                // 获取url
                let next = route.snapshot;
                const segments = [];
                while (next) {
                    segments.push(next.url.join('/'));
                    next = next.parent;
                }
                const url = '/' + segments.filter(i => i).reverse().join('/');
                // console.log(url);
                // console.log(route);
            })
            // .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((routeData) => {
                console.log(routeData);
                // screen,layout: full,default/undefined
                const layout = routeData['layout'];
                this._layout = layout ? layout : 'default';
                // sidebar: none, left, right
                const sidebar = routeData['sidebar'];
                this._sidebar = sidebar ? sidebar : 'left';
                // tab: none, top, right,left,bottom
                const tab = routeData['tab'];
                this._tab = tab ? tab : 'top';
            });
    }

    private setModule(url: string): void {
        // 根据path获取module信息
        const path = url + '/';


        let temp = this.moduleDefiniens.find(defin => path.startsWith(defin.path));
        if (!temp) {
            // 默认module
            temp = this.moduleDefiniens[this.moduleDefiniens.length - 1];
        }
        // console.log('模块信息:', temp);

        // 是否为当前选择模块
        if (this.selectModule && this.selectModule.path === temp.path) {

            if (temp.path === '/') {
                this.titleService.setTitle(temp.title);
            }

            return;
        }

        // 是否已经展示过该module
        const exitModule = this.moduleList.find(module => module.path === temp.path);
        if (exitModule) {
            // console.log('存在模块缓存:', exitModule.module);
            this.moduleList.forEach(module => module.isSelect = url.startsWith(module.path));
            if (exitModule.menuData) {
                this.menuService.add(exitModule.path, temp.path, exitModule.menuData);
            } else {
                // 加载模块菜单信息
                const menuData = this.loadMenuData(temp.path);
                exitModule.menuData = menuData;
                this.menuService.add(exitModule.path, temp.path, menuData);
            }
            this.selectModule = exitModule;
        } else {
            // console.log('不存在模块缓存:', temp.path);
            // 加载模块相关信息
            const module = this.loadModuleData(temp.path, temp.title);

            // 刷新菜单
            const menuData = module.menuData;
            this.menuService.add(module.path, temp.path, menuData);

            // console.log(module);
            this.moduleList.push(module);
            this.selectModule = module;
        }
        this.titleService.setTitle(temp.title);
    }

    private loadMenuData(path: string): MenuData[] {
        switch (path) {
            case '/showcase/':
                return appMenuData.menu;
            case '/pages/':
                return pagesMenuData.menu;
            case '/':
                return [];
            default:
                return [];
        }
    }


    private loadModuleData(path: string, title: string): { path: string, title: string, isSelect: boolean, menuData: MenuData[] } {
        return {path: path, title: title, isSelect: true, menuData: this.loadMenuData(path)};
    }
}


const appMenuData = {
    'app': {
        'name': 'ngx-fuzhutech-common',
        'description': 'ngx-fuzhutech-common admin panel front-end framework'
    },
    'user': {
        'name': 'Admin',
        'avatar': './assets/img/zorro.svg',
        'email': 'fuzhutech@163.com'
    },
    'menu': [
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [
                {
                    'text': '仪表盘',
                    'translate': 'dashboard',
                    'link': '/showcase/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [
                        {
                            'text': '仪表盘V1',
                            'link': '/showcase/dashboard/v1',
                            'translate': 'dashboard_v1'
                        },
                        {
                            'text': '分析页',
                            'link': '/showcase/dashboard/analysis',
                            'translate': 'dashboard_analysis'
                        },
                        {
                            'text': 'Monitor',
                            'link': '/showcase/dashboard/monitor',
                            'translate': 'dashboard_monitor'
                        },
                        {
                            'text': 'Workplace',
                            'link': '/showcase/dashboard/workplace',
                            'translate': 'dashboard_workplace'
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'text': '快捷菜单',
                    'translate': 'shortcut',
                    'icon': 'icon-rocket',
                    'shortcut_root': true,
                    'children': []
                },
                /*{
                    'text': '小部件',
                    'translate': 'widgets',
                    'link': '/showcase/widgets',
                    'icon': 'icon-grid',
                    'badge': 2
                }*/
            ]
        },
        {
            'text': '测试',
            'translate': 'test',
            'group': true,
            'children': [
                {
                    'text': '首页',
                    'translate': 'home1',
                    'link': '/showcase/home1',
                    'icon': 'icon-compass'
                },
                {
                    'text': '登录页面',
                    'translate': 'pages',
                    'link': '/showcase/',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': '登陆',
                            'link': '/showcase/login',
                            'translate': 'm-login',
                            'reuse': true
                        },
                        {
                            'text': '注册',
                            'link': '/showcase/login/register',
                            'translate': 'm-register',
                            'reuse': true
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'text': '组件',
            'translate': 'component',
            'group': true,
            'children': [
                {
                    'text': 'Navigation',
                    'translate': 'Navigation',
                    'link': '/showcase/Navigation',
                    'icon': 'icon-magic-wand',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Affix 固钉',
                            'link': '/showcase/affix',
                            'translate': 'affix'
                        },
                        {
                            'text': 'Dropdown 下拉菜单',
                            'link': '/showcase/dropdown',
                            'translate': 'dropdown'
                        }
                    ]
                },
                {
                    'text': 'Data Entry',
                    'translate': 'forms',
                    'link': '/showcase/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Cascader 级联选择',
                            'link': '/showcase/cascader',
                            'translate': 'cascader'
                        },
                        {
                            'text': 'Rate 评分',
                            'link': '/showcase/rate',
                            'translate': 'rate'
                        },
                        {
                            'text': 'Transfer 穿梭框',
                            'link': '/showcase/transfer',
                            'translate': 'transfer'
                        }
                    ]
                },
                {
                    'text': 'Data Display',
                    'translate': 'editor',
                    'link': '/showcase/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'Avatar 头像',
                            'link': '/showcase/avatar'
                        },
                        {
                            'text': 'Badge 徽标数',
                            'link': '/showcase/badge'
                        },
                        {
                            'text': 'Carousel 走马灯',
                            'link': '/showcase/carousel'
                        },
                        {
                            'text': 'overplay-panel',
                            'link': '/showcase/overplay-panel'
                        },
                        {
                            'text': 'Popover 气泡卡片',
                            'link': '/showcase/popover'
                        },
                        {
                            'text': 'Timeline 时间轴',
                            'link': '/showcase/timeline'
                        }
                    ]
                },
                {
                    'text': 'FeedBack',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Alert 警告提示',
                            'link': '/showcase/alert'
                        },
                        {
                            'text': 'Message 全局提示',
                            'link': '/showcase/message'
                        },
                        {
                            'text': 'Notification 通知提醒框',
                            'link': '/showcase/notification'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Anchor 锚点',
                            'link': '/showcase/anchor'
                        },
                        {
                            'text': 'BackTop 回到顶部',
                            'link': '/showcase/back-top'
                        }
                    ]
                }
            ]
        },
        {
            'text': 'Pro',
            'translate': 'pro',
            'group': true,
            'children': [
                {
                    'text': 'Form Page',
                    'translate': 'form',
                    'link': '/showcase/pro/form',
                    'icon': 'icon-note',
                    'children': [
                        {
                            'text': 'Step Form',
                            'link': '/showcase/pro/form/step-form',
                            'translate': 'step-form'
                        },
                        {
                            'text': 'Advanced Form',
                            'link': '/showcase/pro/form/advanced-form',
                            'translate': 'advanced-form'
                        }
                    ]
                },
                {
                    'text': 'List',
                    'translate': 'pro-list',
                    'link': '/showcase/pro/list',
                    'icon': 'icon-grid',
                    'children': [
                        {
                            'text': 'Table List',
                            'link': '/showcase/pro/list/table-list',
                            'translate': 'pro-table-list'
                        },
                        {
                            'text': 'Basic List',
                            'link': '/showcase/pro/list/basic-list',
                            'translate': 'pro-basic-list'
                        },
                        {
                            'text': 'Card List',
                            'link': '/showcase/pro/list/card-list',
                            'translate': 'pro-card-list'
                        },
                        {
                            'text': 'Cover Card List',
                            'link': '/showcase/pro/list/cover-card-list',
                            'translate': 'pro-cover-card-list'
                        },
                        {
                            'text': 'Filter Card List',
                            'link': '/showcase/pro/list/filter-card-list',
                            'translate': 'pro-filter-card-list'
                        },
                        {
                            'text': 'Search',
                            'link': '/showcase/pro/list/search',
                            'translate': 'pro-search'
                        }
                    ]
                },
                {
                    'text': 'Profile',
                    'translate': 'pro-profile',
                    'link': '/showcase/pro/profile',
                    'icon': 'icon-book-open',
                    'children': [
                        {
                            'text': 'Basic',
                            'link': '/showcase/pro/profile/basic',
                            'translate': 'pro-profile-basic'
                        },
                        {
                            'text': 'Advanced',
                            'link': '/showcase/pro/profile/advanced',
                            'translate': 'pro-profile-advanced'
                        }
                    ]
                },
                {
                    'text': 'Result',
                    'translate': 'pro-result',
                    'link': '/showcase/pro/result',
                    'icon': 'icon-check',
                    'children': [
                        {
                            'text': 'Success',
                            'link': '/showcase/pro/result/success',
                            'translate': 'pro-result-success'
                        },
                        {
                            'text': 'Fail',
                            'link': '/showcase/pro/result/fail',
                            'translate': 'pro-result-fail'
                        }
                    ]
                },
                {
                    'text': 'Exception',
                    'translate': 'pro-exception',
                    'link': '/showcase/',
                    'icon': 'icon-fire',
                    'children': [
                        {
                            'text': '403',
                            'link': '/showcase/403',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/500',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'User',
                    'translate': 'pro-user',
                    'link': '/showcase/passport',
                    'icon': 'icon-user',
                    'children': [
                        {
                            'text': 'login',
                            'link': '/showcase/passport/login',
                            'translate': 'pro-login',
                            'reuse': false
                        },
                        {
                            'text': 'register',
                            'link': '/showcase/passport/register',
                            'translate': 'pro-register',
                            'reuse': false
                        },
                        {
                            'text': 'register result',
                            'link': '/showcase/passport/register-result',
                            'translate': 'pro-register-result',
                            'reuse': false
                        }
                    ]
                }
            ]
        },
        {
            'text': 'More',
            'translate': 'more',
            'group': true,
            'children': [
                {
                    'text': 'Common Logics',
                    'translate': 'logics',
                    'link': '/showcase/logics',
                    'icon': 'icon-compass',
                    'children': [
                        {
                            'text': 'ACL',
                            'link': '/showcase/logics/acl',
                            'translate': 'acl'
                        },
                        {
                            'text': 'Route Guard',
                            'link': '/showcase/logics/guard',
                            'translate': 'guard'
                        },
                        {
                            'text': 'Cache',
                            'link': '/showcase/logics/cache',
                            'translate': 'cache'
                        },
                        {
                            'text': 'Down File',
                            'link': '/showcase/logics/downfile',
                            'translate': 'downfile',
                            'shortcut': true,
                            'children': [
                                {
                                    'text': 'Relation1',
                                    'link': '/showcase/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                },
                                {
                                    'text': 'Relation2',
                                    'link': '/showcase/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                }
                            ]
                        },
                        {
                            'text': 'Xlsx',
                            'link': '/showcase/logics/xlsx'
                        },
                        {
                            'text': 'Zip',
                            'link': '/showcase/logics/zip'
                        }
                    ]
                },
                {
                    'text': 'Report',
                    'translate': 'report',
                    'icon': 'anticon anticon-cloud-o',
                    'children': [
                        {
                            'text': 'Relation',
                            'link': '/showcase/data-v/relation',
                            'translate': 'relation',
                            'shortcut': true,
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Pages',
                    'translate': 'pages',
                    'link': '/showcase/pages',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': 'Login',
                            'link': '/showcase/pages/login',
                            'translate': 'm-login',
                            'reuse': false
                        },
                        {
                            'text': 'Register',
                            'link': '/showcase/pages/register',
                            'translate': 'm-register',
                            'reuse': false
                        },
                        {
                            'text': 'Forget',
                            'link': '/showcase/pages/forget',
                            'translate': 'm-forget',
                            'reuse': false
                        },
                        {
                            'text': 'Lock',
                            'link': '/showcase/pages/lock',
                            'translate': 'm-lock',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/pages/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/pages/500',
                            'reuse': false
                        },
                        {
                            'text': 'Maintenance',
                            'link': '/showcase/pages/maintenance',
                            'translate': 'maintenance',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Extras',
                    'translate': 'extras',
                    'link': '/showcase/extras',
                    'icon': 'icon-cup',
                    'children': [
                        {
                            'text': 'Blog',
                            'link': '/showcase/extras/blog',
                            'translate': 'blog',
                            'children': [
                                {
                                    'text': 'List',
                                    'link': '/showcase/extras/blog/list',
                                    'translate': 'list',
                                    'badge': 1,
                                    'badge_dot': true
                                },
                                {
                                    'text': 'Comment',
                                    'link': '/showcase/extras/blog/comment',
                                    'translate': 'comment'
                                },
                                {
                                    'text': 'Post',
                                    'link': '/showcase/extras/blog/post',
                                    'translate': 'post'
                                }, {
                                    'text': 'WebSite',
                                    'externalLink': '//github.com/cipchk/ng-alain',
                                    'target': '_blank',
                                    'translate': 'website'
                                }
                            ]
                        },
                        {
                            'text': 'Help Center',
                            'link': '/showcase/extras/helpcenter',
                            'translate': 'helpcenter'
                        },
                        {
                            'text': 'Settings',
                            'link': '/showcase/extras/settings',
                            'translate': 'settings'
                        },
                        {
                            'text': 'Poi',
                            'link': '/showcase/extras/poi',
                            'translate': 'poi'
                        }
                    ]
                }
            ]
        }
    ]
};


const pagesMenuData = {
    'app': {
        'name': 'ngx-fuzhutech-common',
        'description': 'ngx-fuzhutech-common admin panel front-end framework'
    },
    'user': {
        'name': 'Admin',
        'avatar': './assets/img/zorro.svg',
        'email': 'fuzhutech@163.com'
    },
    'menu': [
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [
                {
                    'text': '仪表盘',
                    'translate': 'dashboard',
                    'link': '/showcase/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [
                        {
                            'text': '仪表盘V1',
                            'link': '/showcase/dashboard/v1',
                            'translate': 'dashboard_v1'
                        },
                        {
                            'text': '分析页',
                            'link': '/showcase/dashboard/analysis',
                            'translate': 'dashboard_analysis'
                        },
                        {
                            'text': 'Monitor',
                            'link': '/showcase/dashboard/monitor',
                            'translate': 'dashboard_monitor'
                        },
                        {
                            'text': 'Workplace',
                            'link': '/showcase/dashboard/workplace',
                            'translate': 'dashboard_workplace'
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'text': '快捷菜单',
                    'translate': 'shortcut',
                    'icon': 'icon-rocket',
                    'shortcut_root': true,
                    'children': []
                },
                /*{
                    'text': '小部件',
                    'translate': 'widgets',
                    'link': '/showcase/widgets',
                    'icon': 'icon-grid',
                    'badge': 2
                }*/
            ]
        },
        {
            'text': '测试',
            'translate': 'test',
            'group': true,
            'children': [
                {
                    'text': '首页',
                    'translate': 'home1',
                    'link': '/showcase/home1',
                    'icon': 'icon-compass'
                },
                {
                    'text': '登录页面',
                    'translate': 'pages',
                    'link': '/showcase/',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': '登陆',
                            'link': '/showcase/login',
                            'translate': 'm-login',
                            'reuse': true
                        },
                        {
                            'text': '注册',
                            'link': '/showcase/login/register',
                            'translate': 'm-register',
                            'reuse': true
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/showcase/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/showcase/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/showcase/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/showcase/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/showcase/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/showcase/login/register',
                                            'translate': 'm-register',
                                            'reuse': true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'text': '组件',
            'translate': 'component',
            'group': true,
            'children': [
                {
                    'text': 'Navigation',
                    'translate': 'Navigation',
                    'link': '/showcase/Navigation',
                    'icon': 'icon-magic-wand',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Affix 固钉',
                            'link': '/showcase/affix',
                            'translate': 'affix'
                        },
                        {
                            'text': 'Dropdown 下拉菜单',
                            'link': '/showcase/dropdown',
                            'translate': 'dropdown'
                        }
                    ]
                },
                {
                    'text': 'Data Entry',
                    'translate': 'forms',
                    'link': '/showcase/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Cascader 级联选择',
                            'link': '/showcase/cascader',
                            'translate': 'cascader'
                        },
                        {
                            'text': 'Rate 评分',
                            'link': '/showcase/rate',
                            'translate': 'rate'
                        },
                        {
                            'text': 'Transfer 穿梭框',
                            'link': '/showcase/transfer',
                            'translate': 'transfer'
                        }
                    ]
                },
                {
                    'text': 'Data Display',
                    'translate': 'editor',
                    'link': '/showcase/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'Avatar 头像',
                            'link': '/showcase/avatar'
                        },
                        {
                            'text': 'Badge 徽标数',
                            'link': '/showcase/badge'
                        },
                        {
                            'text': 'Carousel 走马灯',
                            'link': '/showcase/carousel'
                        },
                        {
                            'text': 'overplay-panel',
                            'link': '/showcase/overplay-panel'
                        },
                        {
                            'text': 'Popover 气泡卡片',
                            'link': '/showcase/popover'
                        },
                        {
                            'text': 'Timeline 时间轴',
                            'link': '/showcase/timeline'
                        }
                    ]
                },
                {
                    'text': 'FeedBack',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Alert 警告提示',
                            'link': '/showcase/alert'
                        },
                        {
                            'text': 'Message 全局提示',
                            'link': '/showcase/message'
                        },
                        {
                            'text': 'Notification 通知提醒框',
                            'link': '/showcase/notification'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'charts',
                    'link': '/showcase/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Anchor 锚点',
                            'link': '/showcase/anchor'
                        },
                        {
                            'text': 'BackTop 回到顶部',
                            'link': '/showcase/back-top'
                        }
                    ]
                }
            ]
        },
        {
            'text': 'Pro',
            'translate': 'pro',
            'group': true,
            'children': [
                {
                    'text': 'Form Page',
                    'translate': 'form',
                    'link': '/showcase/pro/form',
                    'icon': 'icon-note',
                    'children': [
                        {
                            'text': 'Step Form',
                            'link': '/showcase/pro/form/step-form',
                            'translate': 'step-form'
                        },
                        {
                            'text': 'Advanced Form',
                            'link': '/showcase/pro/form/advanced-form',
                            'translate': 'advanced-form'
                        }
                    ]
                },
                {
                    'text': 'List',
                    'translate': 'pro-list',
                    'link': '/showcase/pro/list',
                    'icon': 'icon-grid',
                    'children': [
                        {
                            'text': 'Table List',
                            'link': '/showcase/pro/list/table-list',
                            'translate': 'pro-table-list'
                        },
                        {
                            'text': 'Basic List',
                            'link': '/showcase/pro/list/basic-list',
                            'translate': 'pro-basic-list'
                        },
                        {
                            'text': 'Card List',
                            'link': '/showcase/pro/list/card-list',
                            'translate': 'pro-card-list'
                        },
                        {
                            'text': 'Cover Card List',
                            'link': '/showcase/pro/list/cover-card-list',
                            'translate': 'pro-cover-card-list'
                        },
                        {
                            'text': 'Filter Card List',
                            'link': '/showcase/pro/list/filter-card-list',
                            'translate': 'pro-filter-card-list'
                        },
                        {
                            'text': 'Search',
                            'link': '/showcase/pro/list/search',
                            'translate': 'pro-search'
                        }
                    ]
                },
                {
                    'text': 'Profile',
                    'translate': 'pro-profile',
                    'link': '/showcase/pro/profile',
                    'icon': 'icon-book-open',
                    'children': [
                        {
                            'text': 'Basic',
                            'link': '/showcase/pro/profile/basic',
                            'translate': 'pro-profile-basic'
                        },
                        {
                            'text': 'Advanced',
                            'link': '/showcase/pro/profile/advanced',
                            'translate': 'pro-profile-advanced'
                        }
                    ]
                },
                {
                    'text': 'Result',
                    'translate': 'pro-result',
                    'link': '/showcase/pro/result',
                    'icon': 'icon-check',
                    'children': [
                        {
                            'text': 'Success',
                            'link': '/showcase/pro/result/success',
                            'translate': 'pro-result-success'
                        },
                        {
                            'text': 'Fail',
                            'link': '/showcase/pro/result/fail',
                            'translate': 'pro-result-fail'
                        }
                    ]
                },
                {
                    'text': 'Exception',
                    'translate': 'pro-exception',
                    'link': '/showcase/',
                    'icon': 'icon-fire',
                    'children': [
                        {
                            'text': '403',
                            'link': '/showcase/403',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/showcase/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/showcase/500',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'User',
                    'translate': 'pro-user',
                    'link': '/showcase/passport',
                    'icon': 'icon-user',
                    'children': [
                        {
                            'text': 'login',
                            'link': '/showcase/passport/login',
                            'translate': 'pro-login',
                            'reuse': false
                        },
                        {
                            'text': 'register',
                            'link': '/showcase/passport/register',
                            'translate': 'pro-register',
                            'reuse': false
                        },
                        {
                            'text': 'register result',
                            'link': '/showcase/passport/register-result',
                            'translate': 'pro-register-result',
                            'reuse': false
                        }
                    ]
                }
            ]
        }
    ]
};
