import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputsComponent} from './inputs/inputs.component';
import {LayoutsComponent} from './layouts/layouts.component';
import {FzFormsRoutingModule} from './forms-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FzFormsRoutingModule
    ],
    declarations: [InputsComponent, LayoutsComponent]
})
export class FzFormsModule {
}
