import {InjectionToken} from '@angular/core';

export interface NotificationConfig {
    // For all messages as default config (can override when dynamically created)
    nzDuration?: number;
    nzPauseOnHover?: boolean;
    nzAnimate?: boolean;
    // For message container only
    nzMaxStack?: number;

    /* tslint:disable-next-line:no-any */
    [index: string]: any;


    nzTop?: string;
    nzBottom?: string;
    nzPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

export const FZ_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NotificationConfig>('FZ_NOTIFICATION_DEFAULT_CONFIG');

export const FZ_NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('FZ_NOTIFICATION_CONFIG');

export const FZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
    provide: FZ_NOTIFICATION_DEFAULT_CONFIG,
    useValue: {
        nzTop: '24px',
        nzBottom: '24px',
        nzPlacement: 'topRight',
        nzDuration: 4500,
        nzMaxStack: 7,
        nzPauseOnHover: true,
        nzAnimate: true
    }
};
