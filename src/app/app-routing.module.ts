import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoaderComponent} from './loader/loader.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        component: HomeComponent,
        data: {title: '首页', layout: 'tab', sidebar: 'none', state: 'home'}
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {title: '关于', layout: 'tab', sidebar: 'none', state: 'about'}
    },
    {
        path: 'loader',
        component: LoaderComponent,
        data: {title: '加载效果', layout: 'tab', sidebar: 'none', state: 'loader'}
    },
    {path: 'login', loadChildren: './login/login.module#LoginModule', data: {title: '登录', layout: 'full'}},
    {
        path: 'showcase',
        loadChildren: './showcase/showcase.module#ShowcaseModule',
        data: {title: 'showcase', module: 'showcase', power: 'SHOW'}
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        data: {title: 'pages', module: 'pages', power: 'SHOW'}
    }/*,
    { path: '**', component: NotFound }*/
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
