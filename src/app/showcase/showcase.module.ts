import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from './showcase.component';
import {ShowcaseRoutingModule} from './showcase-routing.module';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleReuseStrategy} from '../domain/simple-reuse-strategy';

@NgModule({
    imports: [
        CommonModule,
        ShowcaseRoutingModule,
        // FzReuseTabModule.forRoot(),
        // FzThemeModule,
        // FzSidebarModule
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
