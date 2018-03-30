import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {FzLayoutModule} from '../../lib/components/layout/layout.module';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        FzLayoutModule.forRoot({path: 'pages'})
    ],
    declarations: [PagesComponent]
})
export class PagesModule {
}
