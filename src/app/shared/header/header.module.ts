import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {HeaderStorageComponent} from './header-storage/header-storage.component';
import {HeaderFullScreenComponent} from './header-fullscreen/header-fullscreen.component';
import {HeaderUserComponent} from './header-user/header-user.component';
import {HeaderTaskComponent} from './header-task/header-task.component';
import {HeaderNotifyComponent} from './header-notify/header-notify.component';
import {HeaderIconComponent} from './header-icon/header-icon.component';
import {HeaderThemeComponent} from './header-theme/header-theme.component';
import {
    MatButtonModule, MatSlideToggleModule, MatIconModule, MatToolbarModule, MatInputModule, MatCardModule,
    MatMenuModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FzNoticeIconModule} from '../../../lib/components/notice-icon/notice-icon.module';
import {FzBadgeModule} from '../../../lib/components/badge/badge.module';
import {FzAvatarModule} from '../../../lib/components/avatar/avatar.module';
import {FzDropDownModule} from '../../../lib/components/dropdown/dropdown.module';
import {FzHeaderModule} from '../../../lib/components/header/header.module';
import {FzPopoverModule} from '../../../lib';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatToolbarModule,
        FzAvatarModule,
        FzBadgeModule,
        FzDropDownModule,
        FzNoticeIconModule,
        FzHeaderModule,
        FzPopoverModule,
    ],
    declarations: [
        HeaderComponent,
        HeaderThemeComponent,
        HeaderIconComponent,
        HeaderNotifyComponent,
        HeaderTaskComponent,
        HeaderUserComponent,
        HeaderFullScreenComponent,
        HeaderStorageComponent,
    ],
    exports: [
        HeaderComponent
    ]
})
export class FzAppHeaderModule {
}
