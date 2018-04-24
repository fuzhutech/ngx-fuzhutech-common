import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// import {NzButtonModule} from '../button/nz-button.module';
// import {NzCheckboxModule} from '../checkbox/nz-checkbox.module';
// import {NzInputModule} from '../input/nz-input.module';
// import {NzLocaleModule} from '../locale/index';
import {TransferListComponent} from './transfer-list/transfer-list.component';
import {TransferComponent} from './transfer.component';
import {MatCheckboxModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {TransferSearchComponent} from './transfer-search/transfer-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        /*NzCheckboxModule,
        NzButtonModule,
        NzInputModule,
        NzLocaleModule*/
    ],
    declarations: [
        TransferComponent,
        TransferListComponent,
        TransferSearchComponent
    ],
    exports: [TransferComponent]
})
export class FzTransferModule {
}
