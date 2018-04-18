import {Router} from '@angular/router';
import {Injectable, Injector, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs/observable/zip';
import {catchError} from 'rxjs/operators';
import {Menu, MenuData, MenuService} from './menu.service';
import {SettingsService} from './settings.service';
import {TitleService} from './title.service';

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
                // this.menuService.add(res.menu);
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
            name: `Fuzhutech-Common`,
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
        // this.menuService.add(appMenuData.menu as MenuData[]);

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


export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
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
                    'link': '/dashboard',
                    'icon': 'icon-speedometer',
                    'children': [
                        {
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
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/login/register',
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
                    'link': '/widgets',
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
                    'link': '/home1',
                    'icon': 'icon-compass'
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
                        },
                        {
                            'text': '测试',
                            'translate': 'pages',
                            'link': '/',
                            'icon': 'icon-doc',
                            'acl': 'admin',
                            'children': [
                                {
                                    'text': '测试1',
                                    'link': '/login',
                                    'translate': 'm-login',
                                    'reuse': true
                                },
                                {
                                    'text': '测试2',
                                    'link': '/login/register',
                                    'translate': 'm-register',
                                    'reuse': true
                                },
                                {
                                    'text': '测试3',
                                    'translate': 'pages',
                                    'link': '/',
                                    'icon': 'icon-doc',
                                    'acl': 'admin',
                                    'children': [
                                        {
                                            'text': '测试3-1',
                                            'link': '/login',
                                            'translate': 'm-login',
                                            'reuse': true
                                        },
                                        {
                                            'text': '测试3-2',
                                            'link': '/login/register',
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
                    'link': '/Navigation',
                    'icon': 'icon-magic-wand',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Affix 固钉',
                            'link': '/affix',
                            'translate': 'affix'
                        },
                        {
                            'text': 'Dropdown 下拉菜单',
                            'link': '/dropdown',
                            'translate': 'dropdown'
                        }
                    ]
                },
                {
                    'text': 'Data Entry',
                    'translate': 'forms',
                    'link': '/forms',
                    'icon': 'icon-note',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Cascader 级联选择',
                            'link': '/cascader',
                            'translate': 'cascader'
                        },
                        {
                            'text': 'Rate 评分',
                            'link': '/rate',
                            'translate': 'rate'
                        },
                        {
                            'text': 'Transfer 穿梭框',
                            'link': '/transfer',
                            'translate': 'transfer'
                        }
                    ]
                },
                {
                    'text': 'Data Display',
                    'translate': 'editor',
                    'link': '/editor',
                    'icon': 'icon-pencil',
                    'children': [
                        {
                            'text': 'Avatar 头像',
                            'link': '/avatar'
                        },
                        {
                            'text': 'Badge 徽标数',
                            'link': '/badge'
                        },
                        {
                            'text': 'Carousel 走马灯',
                            'link': '/carousel'
                        },
                        {
                            'text': 'overplay-panel',
                            'link': '/overplay-panel'
                        },
                        {
                            'text': 'Popover 气泡卡片',
                            'link': '/popover'
                        },
                        {
                            'text': 'Timeline 时间轴',
                            'link': '/timeline'
                        }
                    ]
                },
                {
                    'text': 'FeedBack',
                    'translate': 'charts',
                    'link': '/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Alert 警告提示',
                            'link': '/alert'
                        },
                        {
                            'text': 'Message 全局提示',
                            'link': '/message'
                        },
                        {
                            'text': 'Notification 通知提醒框',
                            'link': '/notification'
                        }
                    ]
                },
                {
                    'text': 'Other',
                    'translate': 'charts',
                    'link': '/charts',
                    'icon': 'icon-graph',
                    'acl': 'user1',
                    'children': [
                        {
                            'text': 'Anchor 锚点',
                            'link': '/anchor'
                        },
                        {
                            'text': 'BackTop 回到顶部',
                            'link': '/back-top'
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
                            'shortcut': true,
                            'children': [
                                {
                                    'text': 'Relation1',
                                    'link': '/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                },
                                {
                                    'text': 'Relation2',
                                    'link': '/data-v/relation',
                                    'translate': 'relation',
                                    'reuse': false
                                }
                            ]
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
