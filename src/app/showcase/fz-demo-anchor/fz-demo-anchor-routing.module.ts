import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoAnchorComponent} from './fz-demo-anchor.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoAnchorComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoAnchorRoutingModule {
}
