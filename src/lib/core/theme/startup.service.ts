import {Router} from '@angular/router';
import {Injectable, Injector, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs/observable/zip';
import {catchError} from 'rxjs/operators';
import {Menu, MenuService} from '../../components/reuse-tab/menu.service';
import {SettingsService} from './settings.service';
import {TitleService} from '../../components/reuse-tab/title.service';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(private menuService: MenuService,
                private settingService: SettingsService,
                // private aclService: ACLService,
                private titleService: TitleService,
                // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
                private httpClient: HttpClient,
                private injector: Injector) {
        console.log('StartupService is created');
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get('assets/app-data.json')
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            })
        ).subscribe(([appData]) => {
                // application data
                const res: any = appData;
                // 应用信息：包括站点名、描述、年份
                this.settingService.setApp(res.app);
                // 用户信息：包括姓名、头像、邮箱地址
                this.settingService.setUser(res.user);
                // ACL：设置权限为全量
                // this.aclService.setFull(true);
                // 初始化菜单
                this.menuService.add(res.menu);
                // 设置页面标题的后缀
                this.titleService.suffix = res.app.name;
            },
            () => {
            },
            () => {
                resolve(null);
            });
    }

    private viaMock(resolve: any, reject: any) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //     this.injector.get(Router).navigateByUrl('/passport/login');
        //     resolve({});
        //     return;
        // }
        // mock
        const app: any = {
            name: `ng-alain`,
            description: `Ng-zorro admin panel front-end framework`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'cipchk@qq.com',
            token: '123456789'
        };
        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        // this.aclService.setFull(true);
        // 初始化菜单
        /*this.menuService.add([
            {
                text: '主导航',
                group: true,
                children: [
                    {
                        text: '仪表盘',
                        link: '/dashboard',
                        icon: 'icon-speedometer'
                    },
                    {
                        text: '快捷菜单',
                        icon: 'icon-rocket',
                        shortcut_root: true
                    }
                ]
            }
        ]);*/
        this.menuService.add(appMenuData.menu as Menu[]);

        // 设置页面标题的后缀
        this.titleService.suffix = app.name;

        resolve({});
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            // this.viaHttp(resolve, reject);
            // mock
            this.viaMock(resolve, reject);
        });
    }
}


const appMenuData = {
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
        {
            'text': '主导航',
            'translate': 'main_navigation',
            'group': true,
            'children': [
                {
                    'text': '仪表盘',
                    'translate': 'dashboard',
                    'link': '/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [{
                        'text': '仪表盘V1',
                        'link': '/dashboard/v1',
                        'translate': 'dashboard_v1'
                    },
                        {
                            'text': '分析页',
                            'link': '/dashboard/analysis',
                            'translate': 'dashboard_analysis'
                        },
                        {
                            'text': 'Monitor',
                            'link': '/dashboard/monitor',
                            'translate': 'dashboard_monitor'
                        },
                        {
                            'text': 'Workplace',
                            'link': '/dashboard/workplace',
                            'translate': 'dashboard_workplace'
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
                {
                    'text': '小部件',
                    'translate': 'widgets',
                    'link': '/widgets',
                    'icon': 'icon-grid',
                    'badge': 2
                }
            ]
        },
        {
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
                            // 'shortcut': true,
                            'reuse': true
                        },
                        {
                            'text': '关于我们',
                            'link': '/about',
                            'translate': 'relation',
                            // 'shortcut': true,
                            'reuse': true
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
                            'reuse': true
                        },
                        {
                            'text': '注册',
                            'link': '/login/register',
                            'translate': 'm-register',
                            'reuse': true
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
                    'text': '基础元素',
                    'translate': 'elements',
                    'link': '/elements',
                    'icon': 'icon-chemistry',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': '按钮',
                            'link': '/elements/buttons',
                            'translate': 'buttons',
                            'shortcut': true
                        },
                        {
                            'text': 'Notification',
                            'link': '/elements/notification',
                            'translate': 'notification',
                            'shortcut': true
                        },
                        {
                            'text': 'Modal',
                            'link': '/elements/modal',
                            'translate': 'modal'
                        },
                        {
                            'text': 'SweetAlert',
                            'link': '/elements/sweetalert',
                            'translate': 'sweetalert'
                        },
                        {
                            'text': 'Tree Antd',
                            'link': '/elements/tree-antd',
                            'translate': 'tree-antd'
                        },
                        {
                            'text': 'Sortable',
                            'link': '/elements/sortable',
                            'translate': 'sortable'
                        },
                        {
                            'text': 'Spin',
                            'link': '/elements/spin',
                            'translate': 'spin'
                        },
                        {
                            'text': 'Dropdown',
                            'link': '/elements/dropdown',
                            'translate': 'dropdown'
                        },
                        {
                            'text': 'Grid',
                            'link': '/elements/grid',
                            'translate': 'grid'
                        },
                        {
                            'text': 'Grid Masonry',
                            'link': '/elements/gridmasonry',
                            'translate': 'gridmasonry'
                        },
                        {
                            'text': 'Typography',
                            'link': '/elements/typography',
                            'translate': 'typography'
                        },
                        {
                            'text': 'Font Icons',
                            'link': '/elements/iconsfont',
                            'translate': 'iconsfont'
                        },
                        {
                            'text': 'Colors',
                            'link': '/elements/colors',
                            'translate': 'colors'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'other',
                    'link': '/other',
                    'icon': 'icon-magic-wand',
                    'children': [
                        {
                            'text': 'Split',
                            'link': '/other/split',
                            'translate': 'split'
                        },
                        {
                            'text': 'Clipboard',
                            'link': '/other/clipboard',
                            'translate': 'clipboard'
                        }
                    ]
                },
                {
                    'text': '表单',
                    'translate': 'forms',
                    'link': '/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': '标准',
                            'link': '/forms/standard',
                            'translate': 'standard'
                        },
                        {
                            'text': '扩展',
                            'link': '/forms/extended',
                            'translate': 'extended'
                        },
                        {
                            'text': '校验',
                            'link': '/forms/validation',
                            'translate': 'validation'
                        },
                        {
                            'text': '上传',
                            'link': '/forms/upload',
                            'translate': 'upload',
                            'shortcut': true
                        },
                        {
                            'text': '图片裁剪',
                            'link': '/forms/cropper',
                            'translate': 'cropper'
                        }
                    ]
                },
                {
                    'text': '编辑器',
                    'translate': 'editor',
                    'link': '/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'UEditor',
                            'link': '/editor/ueditor'
                        },
                        {
                            'text': 'Tinymce',
                            'link': '/editor/tinymce'
                        }
                    ]
                },
                {
                    'text': 'Charts',
                    'translate': 'charts',
                    'link': '/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [{
                        'text': 'G2',
                        'link': '/charts/g2'
                    }
                    ]
                },
                {
                    'text': '表格',
                    'translate': 'tables',
                    'link': '/tables',
                    'icon': 'icon-grid',
                    'acl': 'user2',
                    'children': [
                        {
                            'text': '标准',
                            'link': '/tables/standard',
                            'translate': 'standard'
                        },
                        {
                            'text': 'Full',
                            'link': '/tables/full',
                            'translate': 'full'
                        },
                        {
                            'text': 'Simple Table',
                            'link': '/tables/simple-table'
                        },
                        {
                            'text': 'Fullscreen Table',
                            'link': '/tables/fs-table',
                            'translate': 'fs-table'
                        }
                    ]
                },
                {
                    'text': '地图',
                    'translate': 'maps',
                    'link': '/maps',
                    'icon': 'icon-map',
                    'acl': 'user2',
                    'children': [
                        {
                            'text': 'QQ',
                            'link': '/maps/qq',
                            'translate': 'qq'
                        },
                        {
                            'text': 'Baidu',
                            'link': '/maps/baidu',
                            'translate': 'baidu'
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
                    'link': '/pro/form',
                    'icon': 'icon-note',
                    'children': [
                        {
                            'text': 'Step Form',
                            'link': '/pro/form/step-form',
                            'translate': 'step-form'
                        },
                        {
                            'text': 'Advanced Form',
                            'link': '/pro/form/advanced-form',
                            'translate': 'advanced-form'
                        }
                    ]
                },
                {
                    'text': 'List',
                    'translate': 'pro-list',
                    'link': '/pro/list',
                    'icon': 'icon-grid',
                    'children': [
                        {
                            'text': 'Table List',
                            'link': '/pro/list/table-list',
                            'translate': 'pro-table-list'
                        },
                        {
                            'text': 'Basic List',
                            'link': '/pro/list/basic-list',
                            'translate': 'pro-basic-list'
                        },
                        {
                            'text': 'Card List',
                            'link': '/pro/list/card-list',
                            'translate': 'pro-card-list'
                        },
                        {
                            'text': 'Cover Card List',
                            'link': '/pro/list/cover-card-list',
                            'translate': 'pro-cover-card-list'
                        },
                        {
                            'text': 'Filter Card List',
                            'link': '/pro/list/filter-card-list',
                            'translate': 'pro-filter-card-list'
                        },
                        {
                            'text': 'Search',
                            'link': '/pro/list/search',
                            'translate': 'pro-search'
                        }
                    ]
                },
                {
                    'text': 'Profile',
                    'translate': 'pro-profile',
                    'link': '/pro/profile',
                    'icon': 'icon-book-open',
                    'children': [
                        {
                            'text': 'Basic',
                            'link': '/pro/profile/basic',
                            'translate': 'pro-profile-basic'
                        },
                        {
                            'text': 'Advanced',
                            'link': '/pro/profile/advanced',
                            'translate': 'pro-profile-advanced'
                        }
                    ]
                },
                {
                    'text': 'Result',
                    'translate': 'pro-result',
                    'link': '/pro/result',
                    'icon': 'icon-check',
                    'children': [
                        {
                            'text': 'Success',
                            'link': '/pro/result/success',
                            'translate': 'pro-result-success'
                        },
                        {
                            'text': 'Fail',
                            'link': '/pro/result/fail',
                            'translate': 'pro-result-fail'
                        }
                    ]
                },
                {
                    'text': 'Exception',
                    'translate': 'pro-exception',
                    'link': '/',
                    'icon': 'icon-fire',
                    'children': [
                        {
                            'text': '403',
                            'link': '/403',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/500',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'User',
                    'translate': 'pro-user',
                    'link': '/passport',
                    'icon': 'icon-user',
                    'children': [
                        {
                            'text': 'login',
                            'link': '/passport/login',
                            'translate': 'pro-login',
                            'reuse': false
                        },
                        {
                            'text': 'register',
                            'link': '/passport/register',
                            'translate': 'pro-register',
                            'reuse': false
                        },
                        {
                            'text': 'register result',
                            'link': '/passport/register-result',
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
                    'link': '/logics',
                    'icon': 'icon-compass',
                    'children': [
                        {
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
                            'link': '/data-v/relation',
                            'translate': 'relation',
                            'shortcut': true,
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Pages',
                    'translate': 'pages',
                    'link': '/pages',
                    'icon': 'icon-doc',
                    'acl': 'admin',
                    'children': [
                        {
                            'text': 'Login',
                            'link': '/pages/login',
                            'translate': 'm-login',
                            'reuse': false
                        },
                        {
                            'text': 'Register',
                            'link': '/pages/register',
                            'translate': 'm-register',
                            'reuse': false
                        },
                        {
                            'text': 'Forget',
                            'link': '/pages/forget',
                            'translate': 'm-forget',
                            'reuse': false
                        },
                        {
                            'text': 'Lock',
                            'link': '/pages/lock',
                            'translate': 'm-lock',
                            'reuse': false
                        },
                        {
                            'text': '404',
                            'link': '/pages/404',
                            'reuse': false
                        },
                        {
                            'text': '500',
                            'link': '/pages/500',
                            'reuse': false
                        },
                        {
                            'text': 'Maintenance',
                            'link': '/pages/maintenance',
                            'translate': 'maintenance',
                            'reuse': false
                        }
                    ]
                },
                {
                    'text': 'Extras',
                    'translate': 'extras',
                    'link': '/extras',
                    'icon': 'icon-cup',
                    'children': [
                        {
                            'text': 'Blog',
                            'link': '/extras/blog',
                            'translate': 'blog',
                            'children': [
                                {
                                    'text': 'List',
                                    'link': '/extras/blog/list',
                                    'translate': 'list',
                                    'badge': 1,
                                    'badge_dot': true
                                },
                                {
                                    'text': 'Comment',
                                    'link': '/extras/blog/comment',
                                    'translate': 'comment'
                                },
                                {
                                    'text': 'Post',
                                    'link': '/extras/blog/post',
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
                            'link': '/extras/helpcenter',
                            'translate': 'helpcenter'
                        },
                        {
                            'text': 'Settings',
                            'link': '/extras/settings',
                            'translate': 'settings'
                        },
                        {
                            'text': 'Poi',
                            'link': '/extras/poi',
                            'translate': 'poi'
                        }
                    ]
                }
            ]
        }
    ]
};
