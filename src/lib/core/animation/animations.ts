import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata,
} from '@angular/animations';

// Component transition animations
export const slideInDownAnimation: AnimationTriggerMetadata =
// 动画触发器名称
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.5s ease-in')
        ]),
        transition(':leave', [
            animate('1.0s ease-out', style({
                opacity: 0,
                transform: 'translateY(100%)'
            }))
        ])
    ]);
