import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, SkipSelf, Optional} from '@angular/core';

import {SettingsService} from './settings.service';

@NgModule({
    imports: [CommonModule],
    providers: [SettingsService],
    declarations: [],
    exports: []
})
export class FzThemeModule {
}
