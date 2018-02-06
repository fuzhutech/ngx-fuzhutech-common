import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeBoxComponent} from './code-box.component';
import {FzHighlightModule} from '../highlight/highlight.module';
import {MatIconModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FzHighlightModule,
        MatIconModule,
    ],
    declarations: [CodeBoxComponent],
    exports: [CodeBoxComponent]
})
export class FzCodeBoxModule {
}
