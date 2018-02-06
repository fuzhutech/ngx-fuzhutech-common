import {InjectionToken} from '@angular/core';
import {MessageConfig} from '../message/message-config';

export interface NotificationConfig extends MessageConfig {
    nzTop?: string;
    nzRight?: string;
}

export const FZ_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NotificationConfig>('FZ_NOTIFICATION_DEFAULT_CONFIG');

export const FZ_NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('FZ_NOTIFICATION_CONFIG');

export const FZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
    provide: FZ_NOTIFICATION_DEFAULT_CONFIG,
    useValue: {
        nzTop: '24px',
        nzRight: '0px',
        nzDuration: 4500,
        nzMaxStack: 7,
        nzPauseOnHover: true,
        nzAnimate: true
    }
};
