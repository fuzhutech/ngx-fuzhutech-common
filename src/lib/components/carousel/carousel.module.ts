import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './carousel.component';
import {CarouselContentDirective} from './carousel-content.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CarouselComponent, CarouselContentDirective],
    exports: [CarouselComponent, CarouselContentDirective]
})
export class FzCarouselModule {
}
