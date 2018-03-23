import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {AlertComponent} from './alert.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class FzAlertModule {
}
