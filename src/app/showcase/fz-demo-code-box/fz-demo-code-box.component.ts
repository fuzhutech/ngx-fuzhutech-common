import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-code-box',
    templateUrl: './fz-demo-code-box.component.html',
    styleUrls: ['./fz-demo-code-box.component.scss']
})
export class FzDemoCodeBoxComponent implements OnInit {

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

    constructor() {
    }

    ngOnInit() {
    }

}
