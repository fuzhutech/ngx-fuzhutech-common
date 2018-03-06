import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoMessageComponent} from './fz-demo-message.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoMessageComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoMessageRoutingModule {
}
