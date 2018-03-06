import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoHighlightComponent} from './fz-demo-highlight.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoHighlightComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoHighlightRoutingModule {
}
