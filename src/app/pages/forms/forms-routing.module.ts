import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutsComponent} from './layouts/layouts.component';
import {InputsComponent} from './inputs/inputs.component';

const routes: Routes = [
    {path: '', redirectTo: 'inputs', pathMatch: 'full'},
    {
        path: 'inputs',
        component: InputsComponent,
        data: {title: 'inputs', module: 'inputs', power: 'SHOW', tab: 'none'},
    },
    {
        path: 'layouts',
        component: LayoutsComponent,
        data: {title: 'layouts', module: 'layouts', power: 'SHOW', sidebar: 'none'},
    },
    // {path: 'login', loadChildren: '../login/login.module#LoginModule', data: {title: '登录', module: 'login', power: 'SHOW'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FzFormsRoutingModule {
}
