import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoAvatarComponent} from './fz-demo-avatar.component';
import {FzDemoAvatarRoutingModule} from './fz-demo-avatar-routing.module';
import {FzAvatarModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FzAvatarModule,
        FzDemoAvatarRoutingModule
    ],
    declarations: [FzDemoAvatarComponent]
})
export class FzDemoAvatarModule {
}
