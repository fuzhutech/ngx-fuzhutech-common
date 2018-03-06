import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoHighlightComponent} from './fz-demo-highlight.component';
import {FzHighlightModule} from '../../../lib';
import {FzDemoHighlightRoutingModule} from './fz-demo-highlight-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FzHighlightModule,
        FzDemoHighlightRoutingModule
    ],
    declarations: [FzDemoHighlightComponent]
})
export class FzDemoHighlightModule {
}
