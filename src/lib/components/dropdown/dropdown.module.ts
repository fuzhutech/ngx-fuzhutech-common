import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// import { NzButtonModule } from '../button/nz-button.module';
// import { NzMenuModule } from '../menu/nz-menu.module';
import {DropDownComponent} from './dropdown.component';
import {DropDownDirective} from './dropdown.directive';

@NgModule({
    imports: [CommonModule, OverlayModule, FormsModule, /*NzButtonModule, NzMenuModule*/],
    declarations: [DropDownComponent, DropDownDirective],
    exports: [DropDownComponent, DropDownDirective]
})
export class FzDropDownModule {
}
