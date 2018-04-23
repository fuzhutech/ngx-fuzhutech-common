import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoticeListComponent} from './notice-list/notice-list.component';
import {NoticeIconComponent} from './notice-icon.component';
import {FzBadgeModule} from '../badge/badge.module';
import {FzPopoverModule} from '../popover/popover.module';
import {MatIconModule, MatListModule, MatTabsModule, MatCardModule} from '@angular/material';
import {FzAvatarModule} from '../avatar/avatar.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {FzDropDownModule} from '../dropdown/dropdown.module';

const COMPONENTS = [NoticeListComponent, NoticeIconComponent];

// import { AdDescListModule } from '../desc-list/desc-list.module';

// region: zorro modules

// import { NzPopoverModule, NzBadgeModule, NzSpinModule, NzTabsModule, NzTagModule } from 'ng-zorro-antd';
// import { NzListModule, NzIconModule } from 'ng-zorro-antd-extra';

const ZORROMODULES = [
    // NzPopoverModule, NzBadgeModule, NzSpinModule, NzTabsModule, NzTagModule,
    // NzListModule, NzIconModule
];

// endregion

@NgModule({
    imports: [
        CommonModule,
        FzBadgeModule, FzPopoverModule, FzAvatarModule, FzDropDownModule, OverlayModule,
        MatTabsModule, MatListModule, MatIconModule, MatCardModule,
        /*AdDescListModule.forRoot(),*/ ...ZORROMODULES
    ],
    declarations: [
        NoticeListComponent,
        NoticeIconComponent
    ],
    exports: [...COMPONENTS]
})
export class FzNoticeIconModule {
    /*static forRoot(): ModuleWithProviders {
        return {ngModule: FzNoticeIconModule, providers: []};
    }*/
}

