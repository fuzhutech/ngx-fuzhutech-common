import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../lib/components/message/message.service';

@Component({
    selector: 'fz-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    _code = '@NgModule({\n' +
        '    imports: [\n' +
        '        RouterModule.forRoot([\n' +
        '            {path: \'\', redirectTo: \'home\', pathMatch: \'full\'},\n' +
        '            {path: \'home\', component: HomeComponent},\n' +
        '            {path: \'tab-page\', loadChildren: \'./tab-page/tab-page-demo.module#FzTabPageDemoModule\'},\n' +
        '            {path: \'nest-nav\', loadChildren: \'./nest-nav/nest-nav-demo.module#FzNestNavDemoModule\'}\n' +
        '        ])\n' +
        '    ],\n' +
        '    exports: [RouterModule]\n' +
        '})\n' +
        'export class AppRoutingModule {\n' +
        '}';

    _code1 = '@NgModule({\n' +
        '    imports: [\n' +
        '        RouterModule.forRoot([\n' +
        '            {path: \'\', redirectTo: \'home\', pathMatch: \'full\'},\n' +
        '            {path: \'home\', component: HomeComponent},\n' +
        '            {path: \'tab-page\', loadChildren: \'./tab-page/tab-page-demo.module#FzTabPageDemoModule\'},\n' +
        '            {path: \'nest-nav\', loadChildren: \'./nest-nav/nest-nav-demo.module#FzNestNavDemoModule\'}\n' +
        '        ])\n' +
        '    ],\n' +
        '    exports: [RouterModule]\n' +
        '})\n' +
        'export class AppRoutingModule {\n' +
        '}';

    _markdownCode = '语义化的矢量图形。\n' +
        '\n' +
        '## 图标的命名规范\n' +
        '\n' +
        '我们为每个图标赋予了语义化的命名，命名规则如下:\n' +
        '\n' +
        '- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`（实心） 和 `question-circle-o`（描线）；\n' +
        '- 命名顺序：`[图标名]-[形状?]-[描线?]-[方向?]`。\n' +
        '\n' +
        '> `?` 为可选。\n' +
        '\n' +
        '<!-- 完整的图标设计规范请访问 [图标规范](/docs/spec/icon)。 -->\n' +
        '\n' +
        '## 如何使用\n' +
        '\n' +
        '使用 `i` 标签声明组件，指定图标对应的 class 属性，示例代码如下:\n' +
        '\n' +
        '```html\n' +
        '<i class="anticon anticon-${type}"></i>\n' +
        '```\n' +
        '\n' +
        '## 本地部署\n' +
        '\n' +
        '图标默认托管在 [iconfont.cn](http://iconfont.cn)，默认公网可访问。如需本地部署，可以下载<a href="./assets/download/fonts.zip">iconfont</a>文' +
        '件,解压后放在 `assets/fonts`或其他公网可访问的文件夹下\n' +
        '\n' +
        '> `NgZorroAntdModule.forRoot()` 方法能够接受一个可选的配置对象，用于引入外部的字体文件，类型为 `{ extraFontName: string, extraFontUrl: string }`。\n' +
        '\n' +
        '例如\n' +
        '```typescript\n' +
        '@NgModule({\n' +
        '  ...\n' +
        '  imports: [\n' +
        '    ...\n' +
        '    NgZorroAntdModule.forRoot({ extraFontName: \'anticon\', extraFontUrl: \'./assets/fonts/iconfont\' })\n' +
        '    ...\n' +
        '  ]\n' +
        '  ...\n' +
        '})\n' +
        '```\n' +
        '## 图标列表\n' +
        '\n' +
        '> 点击图标复制代码。';

    constructor(private _message: MessageService) {
    }

    ngOnInit() {
    }

    createBasicMessage() {
        this._message.info('这是一条普通的提醒');
    }

}