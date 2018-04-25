import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SCROLL_SERVICE_PROVIDER} from '../../core/scroll/scroll.service';
import {AnchorLinkComponent} from './anchor-link/anchor-link.component';
import {AnchorComponent} from './anchor.component';
import {FzAffixModule} from '../affix/affix.module';

@NgModule({
    declarations: [AnchorComponent, AnchorLinkComponent],
    exports: [AnchorComponent, AnchorLinkComponent],
    imports: [CommonModule, FzAffixModule],
    providers: [SCROLL_SERVICE_PROVIDER]
})
export class FzAnchorModule {
}
