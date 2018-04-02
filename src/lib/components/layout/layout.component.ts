import {Component, ElementRef, Injectable, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TitleService} from '../reuse-tab/title.service';
import {Menu, MenuService} from '../reuse-tab/menu.service';
import {LayoutConfig} from './layout.config';


@Component({
    selector: 'fz-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    _sidebarOpen = true;
    // screen,layout: full,default/undefined
    _layout = 'default';
    // sidebar: none, left, right
    _sidebar = 'left';
    // tab: none, top, right,left,bottom
    _tab = 'top';

    get showSidebar(): boolean {
        if (this._layout === 'full') {
            return false;
        }
        return this._sidebar !== 'none';  // coerceBooleanProperty
    }

    get showReuseTab(): boolean {
        if (this._layout === 'full') {
            return false;
        }
        return this._tab !== 'none';
    }


    @ViewChild('sidebarContainerElement') sidebarContainerElement: ElementRef;

    moduleList: Array<{ module: string, isSelect: boolean }> = [];
    selectModule = {module: '', power: '', isSelect: true};

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private title: Title,
                private titleService: TitleService,
                public menuService: MenuService,
                private menuConfig: LayoutConfig) {
        if (this.menuConfig.path === 'showcase') {
            this.menuService.add(appMenuData.menu as Menu[]);
        } else {
            this.menuService.add(pagesMenuData.menu as Menu[]);
        }
    }

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .do((event: NavigationEnd) => {
                // console.log(event);
                const url = event.urlAfterRedirects;
                const exitModule = this.moduleList.find(module => url.startsWith(module.module));
                if (exitModule) {
                    this.moduleList.forEach(module => module.isSelect = url.startsWith(module.module));
                } else {
                    const index = url.indexOf('/', 1);
                    console.log(index, url.substring(0, index));
                    const module = {module: url.substring(0, index), isSelect: true};
                    this.moduleList.push(module);
                    // 加载模块相关信息
                }
            })
            .map(() => this.activatedRoute)
            .map(route => {
                console.log(route);
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
                console.log(route);
            })
            // .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((routeData) => {
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

    get containerStyle() {
        if (this.sidebarContainerElement) {
            const sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
            return {'width': this._sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : 'calc(100% - 10px)'};
        }

        return {'flex': 1, 'display': 'flex', 'flex-direction': 'column'};
    }


    /*
    //路由列表
  menuList: Array<{ title: string, module: string, power: string,isSelect:boolean }>=[];
    //关闭选项标签
    closeUrl(module: string, isSelect: boolean) {
        //当前关闭的是第几个路由
        let index = this.menuList.findIndex(p => p.module == module);
        //如果只有一个不可以关闭
        if (this.menuList.length == 1) return;

        this.menuList = this.menuList.filter(p => p.module != module);
        //删除复用
        delete SimpleReuseStrategy.handlers[module];
        if (!isSelect) return;
        //显示上一个选中
        let menu = this.menuList[index - 1];
        if (!menu) {//如果上一个没有下一个选中
            menu = this.menuList[index + 1];
        }
        // console.log(menu);
        // console.log(this.menuList);
        this.menuList.forEach(p => p.isSelect = p.module == menu.module);
        //显示当前路由信息
        this.router.navigate(['/' + menu.module]);
    }*/

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
