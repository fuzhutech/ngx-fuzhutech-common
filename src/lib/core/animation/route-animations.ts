import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata, query, group, stagger, keyframes,
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


export const routeAnimation: AnimationTriggerMetadata =
    trigger('routeAnimation', [
        /*transition(':enter', [
            style({
                position: 'absolute'
            }),
            animate('0.5s ease-in-out')
        ]),*/
        transition('* => *', [
            // query(':leave', style({transform: 'translateX(0)'/*, position: 'absolute'*/}), {optional: true}),  // translate不起作用
            // query(':leave', style({transform: 'translateX(0)', position: 'fixed'}), {optional: true}),  // 起作用
            query(':leave', style({transform: 'translateX(0)', position: 'absolute'}), {optional: true}), // 起作用
            // query(':leave', style({transform: 'translateX(0)', position: 'relative'}), {optional: true}), // 起作用
            // query(':leave', style({transform: 'translateX(0)', position: 'static'}), {optional: true}), // 不起作用
            query(':enter', style({transform: 'translateX(100%)', position: 'absolute'}), {optional: true}),

            group([
                query(':leave', animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'})), {optional: true}),
                query(':enter', animate('0.5s ease-in-out', style({transform: 'translateX(0)'})), {optional: true})
            ])
        ])
    ]);


export const routeAnimation1: AnimationTriggerMetadata =
    trigger('routerTransition', [  // 第一个参数是动画名称 stateChangeExpr
        transition('* <=> *', [
            // 指定什么时候执行动画，状态的来源可以是简单的对象属性，也可以是由方法计算出来的值。
            // 重点是，我们得能从组件模板中读取它。官网上有提供一些通配符，[传送门](https://angular.cn/api/animations/transition)
            query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
            query('.block', style({opacity: 0}), {optional: true}),
            group([  // block executes in parallel
                query(':enter', [style({transform: 'translateX(100%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))], {optional: true}),
                query(':leave', [style({transform: 'translateX(0%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))], {optional: true})
            ]),
            query(':enter .block', stagger(400, [style({transform: 'translateY(100px)'}),
                animate('1s ease-in-out', style({transform: 'translateY(0px)', opacity: 1})),
            ]), {optional: true}),
        ])
    ]);


export const routerTransition =
    trigger('routerTransition', [
        transition('* <=> *', [
            query(':enter, :leave', style({position: 'fixed', width: '100%'})
                , {optional: true}),
            query('.block', style({opacity: 0}), {optional: true}),
            group([  // block executes in parallel
                query(':enter', [
                    style({transform: 'translateX(100%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
                ], {optional: true}),
                query(':leave', [
                    style({transform: 'translateX(0%)'}),
                    animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
                ], {optional: true}),
            ]),
            query(':enter .block', stagger(400, [
                style({transform: 'translateY(100px)'}),
                animate('1s ease-in-out',
                    style({transform: 'translateY(0px)', opacity: 1})),
            ]), {optional: true}),
        ])
    ]);

// 在第一次查询中，`:enter`和`:leave`将会匹配被挂载和卸载的组件，多个选择器用逗号分开
// 贝塞尔曲线


export const routerFlyIn: AnimationTriggerMetadata = trigger('flyIn',
    [
        state('in', style({transform: 'translate(0)'})), // 默认平移0
        transition('void => *', [ // 进场动画
            animate(3000, keyframes([
                style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                style({opacity: 1, transform: 'translateX(25px)', offset: 0.3}),
                style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
            ]))
        ]),
        transition('* => void', [ // 离场动画
            animate(3000, keyframes([
                style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                style({opacity: 1, transform: 'translateX(-25px)', offset: 0.7}),
                style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
            ]))
        ])

    ]);


/*
export declare const enum AnimationMetadataType {
    State = 0,
    Transition = 1,
    Sequence = 2,
    Group = 3,
    Animate = 4,
    Keyframes = 5,
    Style = 6,
    Trigger = 7,
    Reference = 8,
    AnimateChild = 9,
    AnimateRef = 10,
    Query = 11,
    Stagger = 12,
}
 */
