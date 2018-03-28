import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RequestPasswordComponent} from './request-password/request-password.component';

const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'request-password',
        component: RequestPasswordComponent,
        data: {title: '首页', module: 'pages', power: 'SHOW'},
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {title: '首页', module: 'pages', power: 'SHOW'},
    },
    // {path: 'login', loadChildren: '../login/login.module#LoginModule', data: {title: '登录', module: 'login', power: 'SHOW'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
