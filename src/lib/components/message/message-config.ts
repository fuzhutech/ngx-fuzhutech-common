import {InjectionToken} from '@angular/core';

export interface MessageConfig {
    // For all messages as default config (can override when dynamically created)
    nzDuration?: number;
    nzPauseOnHover?: boolean;
    nzAnimate?: boolean;
    // For message container only
    nzMaxStack?: number;

    /* tslint:disable-next-line:no-any */
    [index: string]: any;
}

export const FZ_MESSAGE_DEFAULT_CONFIG = new InjectionToken<MessageConfig>('NZ_MESSAGE_DEFAULT_CONFIG');

export const FZ_MESSAGE_CONFIG = new InjectionToken<MessageConfig>('NZ_MESSAGE_CONFIG');

export const FZ_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: FZ_MESSAGE_DEFAULT_CONFIG,
    useValue: {
        nzDuration: 1500,
        nzAnimate: true,
        nzPauseOnHover: true,
        nzMaxStack: 7,
    }
};
