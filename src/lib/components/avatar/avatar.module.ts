import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {AvatarComponent} from './avatar.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [AvatarComponent],
    exports: [AvatarComponent]
})
export class FzAvatarModule {
}
