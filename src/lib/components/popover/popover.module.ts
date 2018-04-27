import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PopoverComponent} from './popover.component';

@NgModule({
    entryComponents: [PopoverComponent],
    exports: [PopoverComponent],
    declarations: [PopoverComponent],
    imports: [CommonModule, OverlayModule]
})

export class FzPopoverModule {
}
