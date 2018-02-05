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

import {MarkdownModule} from '../../lib/components/markdown/markdown.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ImageListSelectComponent} from './image-list-select/image-list-select.component';
import {AgeInputComponent} from './age-input/age-input.component';
import {ChipsListComponent} from './chips-list/chips-list.component';
import {IdentityInputComponent} from './identity-input/identity-input.component';
import {AreaListComponent} from './area-list/area-list.component';
import {FzMessageModule} from '../../lib/components/message/message.module';


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
        MarkdownModule,
        FzMessageModule,
    ],
    declarations: [
        HeaderComponent,
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
        HeaderComponent,
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
        MarkdownModule,
        FzMessageModule,
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
