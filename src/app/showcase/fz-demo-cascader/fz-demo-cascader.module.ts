import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoCascaderComponent} from './fz-demo-cascader.component';
import {FzDemoCascaderRoutingModule} from './fz-demo-cascader-routing.module';
import {FzCascaderModule} from '../../../lib';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FzCascaderModule,
        FzDemoCascaderRoutingModule
    ],
    declarations: [FzDemoCascaderComponent]
})
export class FzDemoCascaderModule {
}
