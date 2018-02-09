import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SimpleReuseStrategy} from './domain/simple-reuse-strategy';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Menu, MenuService} from '../lib/components/reuse-tab/menu.service';

@Component({
    selector: 'fz-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    squareState: string;
    title = 'app';
    darkTheme = false;

    // 路由列表
    menuList: Array<{ title: string, module: string, power: string, isSelect: boolean }> = [];

    constructor(private overlayContainer: OverlayContainer,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                private menuService: MenuService) {

        this.menuService.add(appData.menu as Menu[]);

        this.squareState = 'square';

        // 路由事件
        this.router.events.filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                // 路由data的标题
                const title = event['title'];
                this.menuList.forEach(p => p.isSelect = false);
                const menu = {title: title, module: event['module'], power: event['power'], isSelect: true};
                this.titleService.setTitle(title);
                const exitMenu = this.menuList.find(info => info.title === title);
                if (exitMenu) {// 如果存在不添加，当前表示选中
                    this.menuList.forEach(p => p.isSelect = p.title === title);
                    return;
                }
                this.menuList.push(menu);
            });
    }

    switchTheme(dark: boolean) {
        this.darkTheme = dark;
        if (dark) {
            this.overlayContainer.getContainerElement().classList.add('myapp-dark-theme');
        } else {
            this.overlayContainer.getContainerElement().classList.remove('myapp-dark-theme');
        }
    }

    // 关闭选项标签
    closeUrl(module: string, isSelect: boolean) {
        // 当前关闭的是第几个路由
        const index = this.menuList.findIndex(p => p.module === module);
        // 如果只有一个不可以关闭
        if (this.menuList.length === 1) {
            return;
        }

        this.menuList = this.menuList.filter(p => p.module !== module);
        // 删除复用
        delete SimpleReuseStrategy.handlers[module];
        if (!isSelect) {
            return;
        }
        // 显示上一个选中
        let menu = this.menuList[index - 1];
        if (!menu) {// 如果上一个没有下一个选中
            menu = this.menuList[index + 1];
        }
        // console.log(menu);
        // console.log(this.menuList);
        this.menuList.forEach(p => p.isSelect = p.module === menu.module);
        // 显示当前路由信息
        this.router.navigate(['/' + menu.module]);
    }
}


const appData = {
    'app': {
        'name': 'Alain',
        'description': 'Ng-zorro admin panel front-end framework'
    },
    'user': {
        'name': 'Admin',
        'avatar': './assets/img/zorro.svg',
        'email': 'cipchk@qq.com'
    },
    'menu': [
        /*{
            'text': '首页',
            'translate': 'forms',
            'link': '/home',
            'icon': 'icon-note',
            'acl': 'user1',
        },
        {
            'text': '新闻中心',
            'translate': 'forms',
            'link': '/news',
            'icon': 'icon-note',
            'acl': 'user1',
        },
        {
            'text': '联系我们',
            'translate': 'forms',
            'link': '/about',
            'icon': 'icon-note',
            'acl': 'user1',
        },
        {
            'text': '登录',
            'translate': 'forms',
            'link': '/login',
            'icon': 'icon-note',
            'acl': 'user1',
        },*/
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [{
                'text': '仪表盘',
                'translate': 'dashboard',
                'link': '/dashboard',
                'icon': 'icon-speedometer',
                'children': [{
                    'text': '仪表盘V1',
                    'link': '/dashboard/v1',
                    'translate': 'dashboard_v1'
                }, {
                    'text': '分析页',
                    'link': '/dashboard/analysis',
                    'translate': 'dashboard_analysis'
                }, {
                    'text': 'Monitor',
                    'link': '/dashboard/monitor',
                    'translate': 'dashboard_monitor'
                }, {
                    'text': 'Workplace',
                    'link': '/dashboard/workplace',
                    'translate': 'dashboard_workplace'
                }]
            }, {
                'text': '快捷菜单',
                'translate': 'shortcut',
                'icon': 'icon-rocket',
                'shortcut_root': true,
                'children': []
            }, {
                'text': '小部件',
                'translate': 'widgets',
                'link': '/widgets',
                'icon': 'icon-grid',
                'badge': 2
            }]
        }, {
            'text': '组件',
            'translate': 'component',
            'group': true,
            'children': [{
                'text': '基础元素',
                'translate': 'elements',
                'link': '/elements',
                'icon': 'icon-chemistry',
                'acl': 'user1',
                'children': [{
                    'text': '按钮',
                    'link': '/elements/buttons',
                    'translate': 'buttons',
                    'shortcut': true
                }, {
                    'text': 'Notification',
                    'link': '/elements/notification',
                    'translate': 'notification',
                    'shortcut': true
                }, {
                    'text': 'Modal',
                    'link': '/elements/modal',
                    'translate': 'modal'
                }, {
                    'text': 'SweetAlert',
                    'link': '/elements/sweetalert',
                    'translate': 'sweetalert'
                }, {
                    'text': 'Tree Antd',
                    'link': '/elements/tree-antd',
                    'translate': 'tree-antd'
                }, {
                    'text': 'Sortable',
                    'link': '/elements/sortable',
                    'translate': 'sortable'
                }, {
                    'text': 'Spin',
                    'link': '/elements/spin',
                    'translate': 'spin'
                }, {
                    'text': 'Dropdown',
                    'link': '/elements/dropdown',
                    'translate': 'dropdown'
                }, {
                    'text': 'Grid',
                    'link': '/elements/grid',
                    'translate': 'grid'
                }, {
                    'text': 'Grid Masonry',
                    'link': '/elements/gridmasonry',
                    'translate': 'gridmasonry'
                }, {
                    'text': 'Typography',
                    'link': '/elements/typography',
                    'translate': 'typography'
                }, {
                    'text': 'Font Icons',
                    'link': '/elements/iconsfont',
                    'translate': 'iconsfont'
                }, {
                    'text': 'Colors',
                    'link': '/elements/colors',
                    'translate': 'colors'
                }]
            }, {
                'text': 'Other',
                'translate': 'other',
                'link': '/other',
                'icon': 'icon-magic-wand',
                'children': [{
                    'text': 'Split',
                    'link': '/other/split',
                    'translate': 'split'
                }, {
                    'text': 'Clipboard',
                    'link': '/other/clipboard',
                    'translate': 'clipboard'
                }]
            }, {
                'text': '表单',
                'translate': 'forms',
                'link': '/forms',
                'icon': 'icon-note',
                'acl': 'user1',
                'children': [{
                    'text': '标准',
                    'link': '/forms/standard',
                    'translate': 'standard'
                }, {
                    'text': '扩展',
                    'link': '/forms/extended',
                    'translate': 'extended'
                }, {
                    'text': '校验',
                    'link': '/forms/validation',
                    'translate': 'validation'
                }, {
                    'text': '上传',
                    'link': '/forms/upload',
                    'translate': 'upload',
                    'shortcut': true
                }, {
                    'text': '图片裁剪',
                    'link': '/forms/cropper',
                    'translate': 'cropper'
                }]
            }, {
                'text': '编辑器',
                'translate': 'editor',
                'link': '/editor',
                'icon': 'icon-pencil',
                'children': [{
                    'text': 'UEditor',
                    'link': '/editor/ueditor'
                }, {
                    'text': 'Tinymce',
                    'link': '/editor/tinymce'
                }]
            }, {
                'text': 'Charts',
                'translate': 'charts',
                'link': '/charts',
                'icon': 'icon-graph',
                'acl': 'user1',
                'children': [{
                    'text': 'G2',
                    'link': '/charts/g2'
                }]
            }, {
                'text': '表格',
                'translate': 'tables',
                'link': '/tables',
                'icon': 'icon-grid',
                'acl': 'user2',
                'children': [{
                    'text': '标准',
                    'link': '/tables/standard',
                    'translate': 'standard'
                }, {
                    'text': 'Full',
                    'link': '/tables/full',
                    'translate': 'full'
                }, {
                    'text': 'Simple Table',
                    'link': '/tables/simple-table'
                }, {
                    'text': 'Fullscreen Table',
                    'link': '/tables/fs-table',
                    'translate': 'fs-table'
                }]
            }, {
                'text': '地图',
                'translate': 'maps',
                'link': '/maps',
                'icon': 'icon-map',
                'acl': 'user2',
                'children': [{
                    'text': 'QQ',
                    'link': '/maps/qq',
                    'translate': 'qq'
                }, {
                    'text': 'Baidu',
                    'link': '/maps/baidu',
                    'translate': 'baidu'
                }]
            }]
        }, {
            'text': 'Pro',
            'translate': 'pro',
            'group': true,
            'children': [{
                'text': 'Form Page',
                'translate': 'form',
                'link': '/pro/form',
                'icon': 'icon-note',
                'children': [{
                    'text': 'Step Form',
                    'link': '/pro/form/step-form',
                    'translate': 'step-form'
                }, {
                    'text': 'Advanced Form',
                    'link': '/pro/form/advanced-form',
                    'translate': 'advanced-form'
                }]
            }, {
                'text': 'List',
                'translate': 'pro-list',
                'link': '/pro/list',
                'icon': 'icon-grid',
                'children': [{
                    'text': 'Table List',
                    'link': '/pro/list/table-list',
                    'translate': 'pro-table-list'
                }, {
                    'text': 'Basic List',
                    'link': '/pro/list/basic-list',
                    'translate': 'pro-basic-list'
                }, {
                    'text': 'Card List',
                    'link': '/pro/list/card-list',
                    'translate': 'pro-card-list'
                }, {
                    'text': 'Cover Card List',
                    'link': '/pro/list/cover-card-list',
                    'translate': 'pro-cover-card-list'
                }, {
                    'text': 'Filter Card List',
                    'link': '/pro/list/filter-card-list',
                    'translate': 'pro-filter-card-list'
                }, {
                    'text': 'Search',
                    'link': '/pro/list/search',
                    'translate': 'pro-search'
                }]
            }, {
                'text': 'Profile',
                'translate': 'pro-profile',
                'link': '/pro/profile',
                'icon': 'icon-book-open',
                'children': [{
                    'text': 'Basic',
                    'link': '/pro/profile/basic',
                    'translate': 'pro-profile-basic'
                }, {
                    'text': 'Advanced',
                    'link': '/pro/profile/advanced',
                    'translate': 'pro-profile-advanced'
                }]
            }, {
                'text': 'Result',
                'translate': 'pro-result',
                'link': '/pro/result',
                'icon': 'icon-check',
                'children': [{
                    'text': 'Success',
                    'link': '/pro/result/success',
                    'translate': 'pro-result-success'
                }, {
                    'text': 'Fail',
                    'link': '/pro/result/fail',
                    'translate': 'pro-result-fail'
                }]
            }, {
                'text': 'Exception',
                'translate': 'pro-exception',
                'link': '/',
                'icon': 'icon-fire',
                'children': [{
                    'text': '403',
                    'link': '/403',
                    'reuse': false
                }, {
                    'text': '404',
                    'link': '/404',
                    'reuse': false
                }, {
                    'text': '500',
                    'link': '/500',
                    'reuse': false
                }]
            }, {
                'text': 'User',
                'translate': 'pro-user',
                'link': '/passport',
                'icon': 'icon-user',
                'children': [{
                    'text': 'login',
                    'link': '/passport/login',
                    'translate': 'pro-login',
                    'reuse': false
                }, {
                    'text': 'register',
                    'link': '/passport/register',
                    'translate': 'pro-register',
                    'reuse': false
                }, {
                    'text': 'register result',
                    'link': '/passport/register-result',
                    'translate': 'pro-register-result',
                    'reuse': false
                }]
            }]
        }, {
            'text': 'More',
            'translate': 'more',
            'group': true,
            'children': [{
                'text': 'Common Logics',
                'translate': 'logics',
                'link': '/logics',
                'icon': 'icon-compass',
                'children': [{
                    'text': 'ACL',
                    'link': '/logics/acl',
                    'translate': 'acl'
                },
                    {
                        'text': 'Route Guard',
                        'link': '/logics/guard',
                        'translate': 'guard'
                    },
                    {
                        'text': 'Cache',
                        'link': '/logics/cache',
                        'translate': 'cache'
                    },
                    {
                        'text': 'Down File',
                        'link': '/logics/downfile',
                        'translate': 'downfile',
                        'shortcut': true
                    },
                    {
                        'text': 'Xlsx',
                        'link': '/logics/xlsx'
                    },
                    {
                        'text': 'Zip',
                        'link': '/logics/zip'
                    }]
            }, {
                'text': 'Report',
                'translate': 'report',
                'icon': 'anticon anticon-cloud-o',
                'children': [{
                    'text': 'Relation',
                    'link': '/data-v/relation',
                    'translate': 'relation',
                    'shortcut': true,
                    'reuse': false
                }]
            }, {
                'text': 'Pages',
                'translate': 'pages',
                'link': '/pages',
                'icon': 'icon-doc',
                'acl': 'admin',
                'children': [{
                    'text': 'Login',
                    'link': '/pages/login',
                    'translate': 'm-login',
                    'reuse': false
                }, {
                    'text': 'Register',
                    'link': '/pages/register',
                    'translate': 'm-register',
                    'reuse': false
                }, {
                    'text': 'Forget',
                    'link': '/pages/forget',
                    'translate': 'm-forget',
                    'reuse': false
                }, {
                    'text': 'Lock',
                    'link': '/pages/lock',
                    'translate': 'm-lock',
                    'reuse': false
                }, {
                    'text': '404',
                    'link': '/pages/404',
                    'reuse': false
                }, {
                    'text': '500',
                    'link': '/pages/500',
                    'reuse': false
                }, {
                    'text': 'Maintenance',
                    'link': '/pages/maintenance',
                    'translate': 'maintenance',
                    'reuse': false
                }]
            }, {
                'text': 'Extras',
                'translate': 'extras',
                'link': '/extras',
                'icon': 'icon-cup',
                'children': [{
                    'text': 'Blog',
                    'link': '/extras/blog',
                    'translate': 'blog',
                    'children': [{
                        'text': 'List',
                        'link': '/extras/blog/list',
                        'translate': 'list',
                        'badge': 1,
                        'badge_dot': true
                    }, {
                        'text': 'Comment',
                        'link': '/extras/blog/comment',
                        'translate': 'comment'
                    }, {
                        'text': 'Post',
                        'link': '/extras/blog/post',
                        'translate': 'post'
                    }, {
                        'text': 'WebSite',
                        'externalLink': '//github.com/cipchk/ng-alain',
                        'target': '_blank',
                        'translate': 'website'
                    }]
                }, {
                    'text': 'Help Center',
                    'link': '/extras/helpcenter',
                    'translate': 'helpcenter'
                }, {
                    'text': 'Settings',
                    'link': '/extras/settings',
                    'translate': 'settings'
                }, {
                    'text': 'Poi',
                    'link': '/extras/poi',
                    'translate': 'poi'
                }]
            }]
        }, {
            'text': '测试',
            'translate': 'test',
            'group': true,
            'children': [
                {
                    'text': '首页',
                    'translate': 'home',
                    'link': '/home',
                    'icon': 'icon-compass',
                    'children': []
                },
                {
                    'text': '页面-2',
                    'translate': 'report',
                    'icon': 'anticon anticon-cloud-o',
                    'children': [
                        {
                            'text': '新闻中心',
                            'link': '/news',
                            'translate': 'relation',
                            'shortcut': true,
                            'reuse': false
                        },
                        {
                            'text': '关于我们',
                            'link': '/about',
                            'translate': 'relation',
                            'shortcut': true,
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': '登录页面',
                    'translate': 'pages',
                    'link': '/',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': '登陆',
                            'link': '/login',
                            'translate': 'm-login',
                            'reuse': false
                        },
                        {
                            'text': '注册',
                            'link': '/login/register',
                            'translate': 'm-register',
                            'reuse': false
                        }
                    ]
                }
            ]
        }
    ]
};

