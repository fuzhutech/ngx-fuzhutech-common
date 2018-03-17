import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {OverlayPanelComponent} from './overlay-panel.component';

@NgModule({
    imports: [CommonModule, OverlayModule, MatIconModule],
    exports: [OverlayPanelComponent],
    declarations: [OverlayPanelComponent]
})

export class FzOverlayPanelModule {
}
