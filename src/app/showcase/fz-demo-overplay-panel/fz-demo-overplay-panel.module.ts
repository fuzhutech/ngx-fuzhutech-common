import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoOverplayPanelComponent} from './fz-demo-overplay-panel.component';
import {FzDemoOverplayPanelRoutingModule} from './fz-demo-overplay-panel-routing.module';
import {FzOverlayPanelModule} from '../../../lib/components/overplay-panel/overlay-panel.module';

@NgModule({
    imports: [
        CommonModule,
        FzOverlayPanelModule,
        FzDemoOverplayPanelRoutingModule
    ],
    declarations: [FzDemoOverplayPanelComponent]
})
export class FzDemoOverplayPanelModule {
}
