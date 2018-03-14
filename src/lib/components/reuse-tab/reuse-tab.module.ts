import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouteReuseStrategy} from '@angular/router';

import {ReuseTabComponent} from './reuse-tab.component';
import {ReuseTabService} from './reuse-tab.service';
import {ReuseTabStrategy} from './reuse-tab.strategy';

const COMPONENTS = [ReuseTabComponent];

// region: material modules
import {MatIconModule, MatMenuModule, MatOptionModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {MenuService} from './menu.service';
import {TitleService} from './title.service';
import {FzDropDownModule} from '../../';
import {ReuseTabLabelComponent} from './reuse-tab-label/reuse-tab-label.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {ReuseTabMenuItemComponent} from './reuse-tab-menu-item/reuse-tab-menu-item.component';

const MATERIALMODULES = [MatTabsModule];

// endregion

@NgModule({
    imports: [CommonModule, RouterModule, OverlayModule, MatIconModule, MatOptionModule, MatMenuModule, MatSelectModule, FzDropDownModule, ...MATERIALMODULES],
    declarations: [ReuseTabLabelComponent, ReuseTabMenuItemComponent, ...COMPONENTS],
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
