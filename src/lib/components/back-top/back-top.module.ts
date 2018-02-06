import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {BackTopComponent} from './back-top.component';
import {SCROLL_SERVICE_PROVIDER} from '../../core/scroll/scroll.service';

@NgModule({
    declarations: [BackTopComponent],
    exports: [BackTopComponent],
    imports: [CommonModule],
    providers: [SCROLL_SERVICE_PROVIDER]
})
export class FzBackTopModule {
}
