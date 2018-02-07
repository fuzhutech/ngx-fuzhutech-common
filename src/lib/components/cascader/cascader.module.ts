import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// import { NzInputModule } from '../input/nz-input.module';
import {CascaderComponent} from './cascader.component';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule],
    declarations: [
        CascaderComponent
    ],
    exports: [
        CascaderComponent
    ]
})
export class FzCascaderModule {
}
