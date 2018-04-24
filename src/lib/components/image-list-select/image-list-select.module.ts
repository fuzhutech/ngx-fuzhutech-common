import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatGridListModule} from '@angular/material';
import {ImageListSelectComponent} from './image-list-select.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatGridListModule
    ],
    declarations: [ImageListSelectComponent],
    exports: [ImageListSelectComponent]
})
export class FzImageListSelectModule {
}
