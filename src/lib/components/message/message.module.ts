import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {FZ_MESSAGE_DEFAULT_CONFIG_PROVIDER} from './message-config';
import {MessageComponent} from './message.component';
import {MessageContainerComponent} from './message-container.component';

const providers = [
    FZ_MESSAGE_DEFAULT_CONFIG_PROVIDER
];

@NgModule({
    imports: [CommonModule, OverlayModule, MatIconModule],
    declarations: [MessageContainerComponent, MessageComponent],
    providers,
    entryComponents: [MessageContainerComponent]
})
export class FzMessageModule {
}
