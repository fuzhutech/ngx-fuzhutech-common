import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoCodeBoxComponent} from './fz-demo-code-box.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoCodeBoxComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoCodeBoxRoutingModule {
}
