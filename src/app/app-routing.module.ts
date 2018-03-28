import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FzDemoOverplayPanelModule} from './showcase/fz-demo-overplay-panel/fz-demo-overplay-panel.module';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {title: '首页', module: 'home', power: 'SHOW'}},
    {path: 'login', loadChildren: './login/login.module#LoginModule', data: {title: '登录', module: 'login', power: 'SHOW'}},
    {
        path: 'showcase',
        loadChildren: './showcase/showcase.module#ShowcaseModule',
        data: {title: 'showcase', module: 'showcase', power: 'SHOW'}
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        data: {title: 'pages', module: 'pages', power: 'SHOW'}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const ComponentList = [
    HomeComponent
];
