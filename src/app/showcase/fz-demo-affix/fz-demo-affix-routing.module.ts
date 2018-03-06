import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoAffixComponent} from './fz-demo-affix.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoAffixComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoAffixRoutingModule {
}
