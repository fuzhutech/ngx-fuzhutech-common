import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {FzFormsModule} from './forms/forms.module';

const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: '',
        component: PagesComponent,
        data: {title: '首页'},
        children: [
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule',
                data: {title: 'auth', module: 'auth', power: 'SHOW'}
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#FzFormsModule',
                data: {title: 'forms', module: 'forms', power: 'SHOW'}
            },
        ]
    },
    // {path: 'login', loadChildren: '../login/login.module#LoginModule', data: {title: '登录', module: 'login', power: 'SHOW'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
