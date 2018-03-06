import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FzDemoTimelineComponent} from './fz-demo-timeline.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: FzDemoTimelineComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FzDemoTimelineRoutingModule {
}
