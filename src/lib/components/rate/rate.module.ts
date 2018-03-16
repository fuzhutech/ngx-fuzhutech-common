import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {RateComponent} from './rate.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [RateComponent],
    exports: [RateComponent]
})
export class FzRateModule {
}
