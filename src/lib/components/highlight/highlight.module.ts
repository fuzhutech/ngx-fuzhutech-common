import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightComponent} from './highlight.component';
import {HighlightDirective} from './highlight.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HighlightComponent,
        HighlightDirective
    ],
    exports: [
        HighlightComponent,
        HighlightDirective
    ]
})
export class FzHighlightModule {
}
