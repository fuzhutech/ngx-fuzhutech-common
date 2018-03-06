import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoMarkdownComponent} from './fz-demo-markdown.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoMarkdownComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoMarkdownRoutingModule {
}
