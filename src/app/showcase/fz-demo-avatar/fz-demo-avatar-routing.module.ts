import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoAvatarComponent} from './fz-demo-avatar.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoAvatarComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoAvatarRoutingModule {
}
