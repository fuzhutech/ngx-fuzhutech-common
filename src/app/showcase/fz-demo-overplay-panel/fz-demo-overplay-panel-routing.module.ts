import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoOverplayPanelComponent} from './fz-demo-overplay-panel.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoOverplayPanelComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoOverplayPanelRoutingModule {
}
