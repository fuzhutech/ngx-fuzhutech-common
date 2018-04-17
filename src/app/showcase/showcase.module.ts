import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowcaseComponent} from './showcase.component';
import {ShowcaseRoutingModule} from './showcase-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ShowcaseRoutingModule
    ],
    declarations: [ShowcaseComponent]
})
export class ShowcaseModule {
}
