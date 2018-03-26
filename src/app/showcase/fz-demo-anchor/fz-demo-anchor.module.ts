import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoAnchorComponent} from './fz-demo-anchor.component';
import {FzDemoAnchorRoutingModule} from './fz-demo-anchor-routing.module';
import {FzAffixModule, FzAnchorModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzAnchorModule,
        FzAffixModule,
        FzDemoAnchorRoutingModule
    ],
    declarations: [FzDemoAnchorComponent]
})
export class FzDemoAnchorModule {
}
