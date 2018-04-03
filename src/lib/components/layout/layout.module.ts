import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {FzSidebarModule} from '../sidebar/sidebar.module';
import {FzReuseTabModule} from '../reuse-tab/reuse-tab.module';
import {MenuService} from '../reuse-tab/menu.service';
import {LayoutConfig} from './layout.config';
import {ReuseTabStrategy} from '../reuse-tab/reuse-tab.strategy';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FzSidebarModule,
        FzReuseTabModule.forRoot()
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ],
    providers: [
        // 将策略注册到模块当中
        {provide: RouteReuseStrategy, useClass: ReuseTabStrategy}
    ]
})
export class FzLayoutModule {
    static forRoot(config: LayoutConfig): ModuleWithProviders {
        return {
            ngModule: FzLayoutModule,
            providers: [
                {provide: LayoutConfig, useValue: config},
                MenuService
            ]
        };
    }
}


