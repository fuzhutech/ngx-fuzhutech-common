import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginRoutingModule} from './login-routing.module';
import {FzImageListSelectModule} from '../../lib/components/image-list-select/image-list-select.module';
import {FzAreaListModule} from '../../lib/components/area-list/area-list.module';
import {FzAgeInputModule} from '../../lib/components/age-input/age-input.module';
import {FzIdentityInputModule} from '../../lib/components/identity-input/identity-input.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule,
        FzImageListSelectModule,
        FzAreaListModule,
        FzAgeInputModule,
        FzIdentityInputModule
    ],
    declarations: [LoginComponent, RegisterComponent]
})
export class LoginModule {
}
