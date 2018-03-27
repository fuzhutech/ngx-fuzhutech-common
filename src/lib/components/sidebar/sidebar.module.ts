import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {RouterModule} from '@angular/router';
import {SideNavItemComponent} from './side-nav-item/side-nav-item.component';
import {SideNavFilterComponent} from './side-nav-filter/side-nav-filter.component';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    declarations: [
        SidebarComponent,
        SideNavItemComponent,
        SideNavFilterComponent
    ],
    exports: [
        SidebarComponent,
        SideNavItemComponent,
        SideNavFilterComponent
    ]
})
export class FzSidebarModule {
    // SideNavbarModule
}
