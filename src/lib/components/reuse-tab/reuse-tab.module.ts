import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouteReuseStrategy} from '@angular/router';

import {ReuseTabComponent} from './reuse-tab.component';
import {ReuseTabService} from './reuse-tab.service';
import {ReuseTabStrategy} from './reuse-tab.strategy';

const COMPONENTS = [ReuseTabComponent];

// region: material modules
import {MatTabsModule} from '@angular/material';
import {MenuService} from './menu.service';
import {TitleService} from './title.service';

const MATERIALMODULES = [MatTabsModule];

// endregion

@NgModule({
    imports: [CommonModule, RouterModule, ...MATERIALMODULES],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class FzReuseTabModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FzReuseTabModule,
            providers: [
                MenuService,
                TitleService,
                ReuseTabService,
                {provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ReuseTabService]}
            ]
        };
    }
}
