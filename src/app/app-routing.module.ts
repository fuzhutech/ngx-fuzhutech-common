import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FzDemoOverplayPanelModule} from './showcase/fz-demo-overplay-panel/fz-demo-overplay-panel.module';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {title: '首页', module: 'home', power: 'SHOW'}},
    {path: 'login', loadChildren: './login/login.module#LoginModule', data: {title: '登录', module: 'login', power: 'SHOW'}},
    {
        path: 'affix',
        loadChildren: './showcase/fz-demo-affix/fz-demo-affix.module#FzDemoAffixModule',
        data: {title: 'affix', module: 'affix', power: 'SHOW'}
    },
    {
        path: 'alert',
        loadChildren: './showcase/fz-demo-alert/fz-demo-alert.module#FzDemoAlertModule',
        data: {title: 'alert', module: 'alert', power: 'SHOW'}
    },
    {
        path: 'anchor',
        loadChildren: './showcase/fz-demo-anchor/fz-demo-anchor.module#FzDemoAnchorModule',
        data: {title: 'anchor', module: 'anchor', power: 'SHOW'}
    },
    {
        path: 'avatar',
        loadChildren: './showcase/fz-demo-avatar/fz-demo-avatar.module#FzDemoAvatarModule',
        data: {title: 'avatar', module: 'avatar', power: 'SHOW'}
    },
    {
        path: 'back-top',
        loadChildren: './showcase/fz-demo-back-top/fz-demo-back-top.module#FzDemoBackTopModule',
        data: {title: 'back-top', module: 'back-top', power: 'SHOW'}
    },
    {
        path: 'badge',
        loadChildren: './showcase/fz-demo-badge/fz-demo-badge.module#FzDemoBadgeModule',
        data: {title: 'badge', module: 'badge', power: 'SHOW'}
    },
    {
        path: 'carousel',
        loadChildren: './showcase/fz-demo-carousel/fz-demo-carousel.module#FzDemoCarouselModule',
        data: {title: 'carousel', module: 'carousel', power: 'SHOW'}
    },
    {
        path: 'cascader',
        loadChildren: './showcase/fz-demo-cascader/fz-demo-cascader.module#FzDemoCascaderModule',
        data: {title: 'cascader', module: 'cascader', power: 'SHOW'}
    },
    {
        path: 'code-box',
        loadChildren: './showcase/fz-demo-code-box/fz-demo-code-box.module#FzDemoCodeBoxModule',
        data: {title: 'code-box', module: 'code-box', power: 'SHOW'}
    },
    {
        path: 'dropdown',
        loadChildren: './showcase/fz-demo-dropdown/fz-demo-dropdown.module#FzDemoDropdownModule',
        data: {title: 'dropdown', module: 'dropdown', power: 'SHOW'}
    },
    {
        path: 'highlight',
        loadChildren: './showcase/fz-demo-highlight/fz-demo-highlight.module#FzDemoHighlightModule',
        data: {title: 'highlight', module: 'highlight', power: 'SHOW'}
    },
    {
        path: 'markdown',
        loadChildren: './showcase/fz-demo-markdown/fz-demo-markdown.module#FzDemoMarkdownModule',
        data: {title: 'markdown', module: 'markdown', power: 'SHOW'}
    },
    {
        path: 'message',
        loadChildren: './showcase/fz-demo-message/fz-demo-message.module#FzDemoMessageModule',
        data: {title: 'message', module: 'message', power: 'SHOW'}
    },
    {
        path: 'notification',
        loadChildren: './showcase/fz-demo-notification/fz-demo-notification.module#FzDemoNotificationModule',
        data: {title: 'notification', module: 'notification', power: 'SHOW'}
    },
    {
        path: 'overplay-panel',
        loadChildren: './showcase/fz-demo-overplay-panel/fz-demo-overplay-panel.module#FzDemoOverplayPanelModule',
        data: {title: 'overplay-panel', module: 'overplay-panel', power: 'SHOW'}
    },
    {
        path: 'popover',
        loadChildren: './showcase/fz-demo-popover/fz-demo-popover.module#FzDemoPopoverModule',
        data: {title: 'popover', module: 'popover', power: 'SHOW'}
    },
    {
        path: 'rate',
        loadChildren: './showcase/fz-demo-rate/fz-demo-rate.module#FzDemoRateModule',
        data: {title: 'rate', module: 'rate', power: 'SHOW'}
    },
    {
        path: 'timeline',
        loadChildren: './showcase/fz-demo-timeline/fz-demo-timeline.module#FzDemoTimelineModule',
        data: {title: 'timeline', module: 'timeline', power: 'SHOW'}
    },
    {
        path: 'transfer',
        loadChildren: './showcase/fz-demo-transfer/fz-demo-transfer.module#FzDemoTransferModule',
        data: {title: 'transfer', module: 'transfer', power: 'SHOW'}
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
