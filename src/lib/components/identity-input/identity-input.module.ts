import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {IdentityInputComponent} from './identity-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule, MatFormFieldModule, MatInputModule
    ],
    declarations: [IdentityInputComponent],
    exports: [IdentityInputComponent]
})
export class FzIdentityInputModule {
}
