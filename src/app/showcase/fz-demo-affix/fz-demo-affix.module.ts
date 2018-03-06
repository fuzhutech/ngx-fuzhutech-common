import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoAffixComponent} from './fz-demo-affix.component';
import {FzDemoAffixRoutingModule} from './fz-demo-affix-routing.module';
import {FzAffixModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzAffixModule,
        FzDemoAffixRoutingModule
    ],
    declarations: [FzDemoAffixComponent]
})
export class FzDemoAffixModule {
}
