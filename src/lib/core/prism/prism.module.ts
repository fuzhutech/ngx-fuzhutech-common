import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, SkipSelf, Optional} from '@angular/core';

import {PRISM_SERVICE_PROVIDER} from './prism.service';
import {PrismConfig} from './prism.config';

@NgModule({
    imports: [CommonModule],
    providers: [PRISM_SERVICE_PROVIDER],
    declarations: [],
    exports: []
})
export class FzPrismModule {
    constructor(@Optional() @SkipSelf() parent: FzPrismModule) {
        if (parent) {
            throw new Error('模块已经存在，不能再次加载!');
        }
    }

    static forRoot(config: PrismConfig): ModuleWithProviders {
        return {
            ngModule: FzPrismModule,
            providers: [
                {provide: PrismConfig, useValue: config}
            ]
        };
    }
}
