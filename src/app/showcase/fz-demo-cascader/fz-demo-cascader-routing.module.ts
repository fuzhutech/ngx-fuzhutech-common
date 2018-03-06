import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoCascaderComponent} from './fz-demo-cascader.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoCascaderComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoCascaderRoutingModule {
}
