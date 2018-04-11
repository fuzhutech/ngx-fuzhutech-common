import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata, keyframes,
} from '@angular/animations';


// 动画时间线
const time = '300ms';
const styles = {
    ease: time + ' ease ',
    linear: time + ' linear ',
    easeIn: time + ' ease-in',
    easeOut: time + ' ease-out',
    stepStart: time + ' step-start',
    stepEnd: time + ' step-end',
    easeInOut: time + ' ease-in-out',
    faseOutSlowIn: time + ' cubic-bezier(0.4, 0, 0.2, 1)',
    inOutBack: time + ' cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    inOutCubic: time + ' cubic-bezier(0.65, 0.05, 0.36, 1)',
    inOutQuadratic: time + ' cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    inOutSine: time + ' cubic-bezier(0.45, 0.05, 0.55, 0.95)'
};

// 动画配置

const opts = {
    fadeIn: [
        style({opacity: 0}),
        animate(styles.inOutBack, style({opacity: 1})),
    ],
    fadeOut: [
        style({opacity: 1}),
        animate(styles.inOutBack, style({opacity: 0}))
    ],
    shrink: [
        style({height: '*'}),
        animate(styles.inOutBack, style({height: 0}))
    ],
    stretch: [
        style({height: '0'}),
        animate(styles.inOutBack, style({height: '*'}))
    ],
    flyIn: [
        style({transform: 'translateX(-100%)'}),
        animate(styles.inOutBack, style({transform: '*'}))
    ],
    flyOut: [
        style({transform: '*'}),
        animate(styles.inOutBack, style({transform: 'translateX(-100%)'}))
    ],
    zoomIn: [
        style({transform: 'scale(.5)'}),
        animate(styles.inOutBack, style({transform: '*'}))
    ],
    zoomOut: [
        style({transform: '*'}),
        animate(styles.inOutBack, style({transform: 'scale(.5)'}))
    ]
};

// 导出动画时间线定义,供自定义动画的时候使用
export const animStyle = styles;

// 导出动画
export const fadeIn = [trigger('fadeIn', [transition('void => *', opts.fadeIn)])];
export const fadeOut = [trigger('fadeOut', [transition('* => void', opts.fadeOut)])];
export const stretch = [trigger('stretch', [transition('void => *', opts.stretch)])];
export const shrink = [trigger('shrink', [transition('* => void', opts.shrink)])];
export const flyIn = [trigger('flyIn', [transition('void => *', opts.flyIn)])];
export const flyOut = [trigger('flyOut', [transition('* => void', opts.flyOut)])];
export const zoomIn = [trigger('zoomIn', [transition('void => *', opts.zoomIn)])];
export const zoomOut = [trigger('zoomOut', [transition('* => void', opts.zoomOut)])];

export const simAnim = [
    trigger('simAnim', [
        transition('* => fadeIn', opts.fadeIn),
        transition('* => fadeIn', opts.fadeOut),
        transition('* => shrink', opts.shrink),
        transition('* => stretch', opts.stretch),
        transition('* => flyIn', opts.flyIn),
        transition('* => flyOut', opts.flyOut),
        transition('* => zoomIn', opts.zoomIn),
        transition('* => zoomOut', opts.zoomOut)
    ])
];


// animations: [fadeIn, fadeOut, shrink, stretch, flyIn, flyOut, zoomIn, zoomOut]
// <div @flyIn @flyOut>...</div>
// animations: [simAnim]
// <div [@]simAnim="'flyIn'">...</div>
// [＠simAnim]="'flyOn'"


// 定义一个鼠标点击运动的动画

export const boxAnimate = trigger('box', [
    // 定义一个状态left
    state('left', style({'background-color': '#360', transform: 'translate3d(0,0,0)'})),
    // 定义另外一个状态right
    state('right', style({'background-color': '#630', transform: 'translate3d(500px,0,0)'})),
    // 定义运动过程(从left到right状态)
    transition('left=>right', animate(5000, keyframes([
        style({transform: 'translate3d(10%,0,0)'}),
        style({transform: 'translate3d(20%,0,0)'}),
        style({transform: 'translate3d(40%,0,0)'}),
        style({transform: 'translate3d(50%,0,0)'}),
        style({transform: 'translate3d(60%,0,0)'}),
        style({transform: 'translate3d(70%,0,0)'}),
        style({transform: 'translate3d(80%,0,0)'}),
        style({transform: 'translate3d(90%,0,0)'}),
        style({transform: 'translate3d(100%,0,0)'}),
    ]))),
    // 定义运动过程(从right到left)
    transition('right=>left', animate(5000, keyframes([
        style({transform: 'translate3d(100%,0,0)'}),
        style({transform: 'translate3d(80%,0,0)'}),
        style({transform: 'translate3d(70%,0,0)'}),
        style({transform: 'translate3d(40%,0,0)'}),
        style({transform: 'translate3d(30%,0,0)'}),
        style({transform: 'translate3d(0%,0,0)'})
    ]))),
]);

// <div class="box" (click)="start()" [@box]="boxState"></div>

// 定义一个鼠标移上去的动画
export const boxAnimateHover = trigger('boxHover', [
    // 定义一个状态,正常状态
    state('out', style({transform: 'scale(1)', 'box-shadow': 'none'})),
    // 定义一个状态,鼠标移上去
    state('in', style({transform: 'scale(1.1)', 'box-shadow': '3px 3px 5px 6px #ccc'})),
    // 定义运动过程
    transition('out=>in', animate('200ms ease-in')),
    transition('in=>out', animate('200ms ease-out'))
]);


export const slideToRight = trigger('routerAnimate', [
    // 定义void表示空状态下
    state('void', style({position: 'fixed', 'width': '100%', 'height': '100%'})),
    // * 表示任何状态
    state('*', style({position: 'fixed', 'width': '100%', 'height': '100%'})),
    // 进场动画
    transition(':enter', [
        style({transform: 'translate3d(-100%,0,0)'}),
        animate('.5s ease-in-out', style({transform: 'translate3d(0,0,0)'}))
    ]),
    // 出场动画
    transition(':leave', [
        style({transform: 'translate3d(0,0,0)'}),
        animate('.5s ease-in-out', style({transform: 'translate3d(100%,0,0)'}))
    ])
]);
