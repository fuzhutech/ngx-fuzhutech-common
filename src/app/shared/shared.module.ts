import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
} from '@angular/material';

import {FzMarkdownModule} from '../../lib';

import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ImageListSelectComponent} from './image-list-select/image-list-select.component';
import {AgeInputComponent} from './age-input/age-input.component';
import {ChipsListComponent} from './chips-list/chips-list.component';
import {IdentityInputComponent} from './identity-input/identity-input.component';
import {AreaListComponent} from './area-list/area-list.component';
import {FzMessageModule} from '../../lib';
import {FzNotificationModule} from '../../lib';
import {FzTimelineModule} from '../../lib';
import {FzBackTopModule} from '../../lib';
import {FzRateModule} from '../../lib';
import {FzCodeBoxModule} from '../../lib';
import {FzAlertModule} from '../../lib';
import {FzAffixModule} from '../../lib';
import {FzTransferModule} from '../../lib';
import {FzAvatarModule} from '../../lib';
import {FzBadgeModule} from '../../lib/components/badge/badge.module';
import {FzCarouselModule} from '../../lib';
import {FzCascaderModule} from '../../lib';
import {FzAnchorModule} from '../../lib';
import {FzPopoverModule} from '../../lib';
import {FzDropDownModule} from '../../lib';
import {FzNoticeIconModule} from '../../lib';
import {FzHeaderModule} from './header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatChipsModule,
        FzMarkdownModule,
        FzHeaderModule,
        FzMessageModule,
        FzNotificationModule,
        FzTimelineModule,
        FzBackTopModule,
        FzRateModule,
        FzCodeBoxModule,
        FzAlertModule,
        FzAffixModule,
        FzTransferModule,
        FzAvatarModule,
        FzBadgeModule,
        FzCarouselModule,
        FzCascaderModule,
        FzAnchorModule,
        FzPopoverModule,
        FzDropDownModule,
        FzNoticeIconModule,
    ],
    declarations: [
        FooterComponent,
        SidebarComponent,
        ConfirmDialogComponent,
        ImageListSelectComponent,
        AgeInputComponent,
        ChipsListComponent,
        IdentityInputComponent,
        AreaListComponent,
    ],
    exports: [
        FooterComponent,
        SidebarComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatChipsModule,
        FzMarkdownModule,
        FzHeaderModule,
        FzMessageModule,
        FzNotificationModule,
        FzTimelineModule,
        FzBackTopModule,
        FzRateModule,
        FzCodeBoxModule,
        FzAlertModule,
        FzAffixModule,
        FzTransferModule,
        FzAvatarModule,
        FzBadgeModule,
        FzCarouselModule,
        FzCascaderModule,
        FzAnchorModule,
        FzPopoverModule,
        FzDropDownModule,
        FzNoticeIconModule,
        ImageListSelectComponent,
        AgeInputComponent,
        ChipsListComponent,
        IdentityInputComponent,
        AreaListComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ]
})
export class SharedModule {
}
