import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoCarouselComponent} from './fz-demo-carousel.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoCarouselComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoCarouselRoutingModule {
}
