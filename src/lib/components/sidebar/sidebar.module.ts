import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {RouterModule} from '@angular/router';
import {SideNavItemComponent} from './side-nav-item/side-nav-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SidebarComponent,
        SideNavItemComponent
    ],
    exports: [
        SidebarComponent,
        SideNavItemComponent
    ]
})
export class FzSidebarModule {
}
