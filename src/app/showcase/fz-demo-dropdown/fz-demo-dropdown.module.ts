import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoDropdownComponent} from './fz-demo-dropdown.component';
import {FzDemoDropdownRoutingModule} from './fz-demo-dropdown-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FzDemoDropdownRoutingModule
    ],
    declarations: [FzDemoDropdownComponent]
})
export class FzDemoDropdownModule {
}
