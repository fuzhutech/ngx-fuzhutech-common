import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RateComponent} from './rate.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [RateComponent],
    exports: [RateComponent]
})
export class FzRateModule {
}
