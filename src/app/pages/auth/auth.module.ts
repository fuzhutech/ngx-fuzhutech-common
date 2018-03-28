import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestPasswordComponent} from './request-password/request-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    declarations: [
        RequestPasswordComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {
}
