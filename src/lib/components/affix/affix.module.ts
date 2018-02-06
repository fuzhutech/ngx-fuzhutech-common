import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AffixComponent} from './affix.component';
import {SCROLL_SERVICE_PROVIDER} from '../../core/scroll/scroll.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AffixComponent],
    exports: [AffixComponent],
    providers   : [ SCROLL_SERVICE_PROVIDER ]
})
export class FzAffixModule {
}
