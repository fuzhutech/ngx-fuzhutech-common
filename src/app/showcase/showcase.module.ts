import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from './showcase.component';
import {ShowcaseRoutingModule} from './showcase-routing.module';
import {FzSidebarModule} from '../../lib/components/sidebar/sidebar.module';
import {FzReuseTabModule} from '../../lib/components/reuse-tab/reuse-tab.module';
import {FzThemeModule} from '../../lib/core/theme/theme.module';
import {CustomRouterStateSerializer} from '../reducers';
import {StartupService} from '../../lib/core/theme/startup.service';
import {FzLayoutModule} from '../../lib/components/layout/layout.module';
import {ReuseTabStrategy} from '../../lib/components/reuse-tab/reuse-tab.strategy';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleReuseStrategy} from '../domain/simple-reuse-strategy';

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    imports: [
        CommonModule,
        ShowcaseRoutingModule,
        // FzReuseTabModule.forRoot(),
        // FzThemeModule,
        // FzSidebarModule,
        FzLayoutModule.forRoot({path: 'showcase'})
    ],
    declarations: [ShowcaseComponent],
    providers: [
        /**
         * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
         * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
         * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
         */
        // 最后将策略注册到模块当中
        {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy}
        // {provide: RouteReuseStrategy, useClass: ReuseTabStrategy}
        /*StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }*/
    ],
})
export class ShowcaseModule {
}
