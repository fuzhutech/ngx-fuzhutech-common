import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {AreaListComponent} from './area-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [AreaListComponent],
    exports: [AreaListComponent]
})
export class FzAreaListModule {
}
