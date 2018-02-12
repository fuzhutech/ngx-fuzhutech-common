import {Component, HostListener} from '@angular/core';

// import * as screenfull from 'screenfull';

@Component({
    selector: 'fz-header-fullscreen',
    template: `
        <!--i class="anticon anticon-{{status ? 'shrink' : 'arrows-alt'}}"></i>
        {{(status ? 'fullscreen-exit' : 'fullscreen') | translate }}-->
        <i class="anticon anticon-shrink"></i>全屏
    `
})
export class HeaderFullScreenComponent {

    status = false;

    @HostListener('click')
    _click() {
        /*if (screenfull.enabled) {
            screenfull.toggle();
        }
        this.status = !screenfull.isFullscreen;*/
    }
}
