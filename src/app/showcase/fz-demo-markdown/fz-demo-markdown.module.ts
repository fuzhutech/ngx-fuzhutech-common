import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FzDemoMarkdownComponent} from './fz-demo-markdown.component';
import {FzDemoMarkdownRoutingModule} from './fz-demo-markdown-routing.module';
import {FzMarkdownModule} from '../../../lib/components/markdown/markdown.module';

@NgModule({
    imports: [
        CommonModule,
        FzMarkdownModule,
        FzDemoMarkdownRoutingModule
    ],
    declarations: [FzDemoMarkdownComponent]
})
export class FzDemoMarkdownModule {
}
