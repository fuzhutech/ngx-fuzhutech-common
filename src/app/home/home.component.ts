import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

}
