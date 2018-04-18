import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowcaseComponent} from './showcase.component';

const routes: Routes = [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: '',
        component: ShowcaseComponent,
        data: {title: '首页', tab: 'none'},
        children: [
            {
                path: 'affix',
                loadChildren: './fz-demo-affix/fz-demo-affix.module#FzDemoAffixModule',
            },
            {
                path: 'alert',
                loadChildren: './fz-demo-alert/fz-demo-alert.module#FzDemoAlertModule'
            },
            {
                path: 'anchor',
                loadChildren: './fz-demo-anchor/fz-demo-anchor.module#FzDemoAnchorModule',
                data: {tab: 'none'}
            },
            {
                path: 'avatar',
                loadChildren: './fz-demo-avatar/fz-demo-avatar.module#FzDemoAvatarModule',
            },
            {
                path: 'back-top',
                loadChildren: './fz-demo-back-top/fz-demo-back-top.module#FzDemoBackTopModule',
            },
            {
                path: 'badge',
                loadChildren: './fz-demo-badge/fz-demo-badge.module#FzDemoBadgeModule',
            },
            {
                path: 'carousel',
                loadChildren: './fz-demo-carousel/fz-demo-carousel.module#FzDemoCarouselModule',
            },
            {
                path: 'cascader',
                loadChildren: './fz-demo-cascader/fz-demo-cascader.module#FzDemoCascaderModule',
            },
            {
                path: 'code-box',
                loadChildren: './fz-demo-code-box/fz-demo-code-box.module#FzDemoCodeBoxModule',
            },
            {
                path: 'dropdown',
                loadChildren: './fz-demo-dropdown/fz-demo-dropdown.module#FzDemoDropdownModule',
            },
            {
                path: 'highlight',
                loadChildren: './fz-demo-highlight/fz-demo-highlight.module#FzDemoHighlightModule',
            },
            {
                path: 'markdown',
                loadChildren: './fz-demo-markdown/fz-demo-markdown.module#FzDemoMarkdownModule',
            },
            {
                path: 'message',
                loadChildren: './fz-demo-message/fz-demo-message.module#FzDemoMessageModule',
            },
            {
                path: 'notification',
                loadChildren: './fz-demo-notification/fz-demo-notification.module#FzDemoNotificationModule',
            },
            {
                path: 'overplay-panel',
                loadChildren: './fz-demo-overplay-panel/fz-demo-overplay-panel.module#FzDemoOverplayPanelModule',
            },
            {
                path: 'popover',
                loadChildren: './fz-demo-popover/fz-demo-popover.module#FzDemoPopoverModule',
            },
            {
                path: 'rate',
                loadChildren: './fz-demo-rate/fz-demo-rate.module#FzDemoRateModule',
            },
            {
                path: 'timeline',
                loadChildren: './fz-demo-timeline/fz-demo-timeline.module#FzDemoTimelineModule',
            },
            {
                path: 'transfer',
                loadChildren: './fz-demo-transfer/fz-demo-transfer.module#FzDemoTransferModule',
            }
        ]
    },
    {path: 'login', loadChildren: '../login/login.module#LoginModule', data: {title: '登录'}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}
