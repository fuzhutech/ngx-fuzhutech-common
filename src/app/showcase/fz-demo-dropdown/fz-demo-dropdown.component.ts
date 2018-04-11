import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {boxAnimate, boxAnimateHover, slideToRight} from '../../../lib/core/animation/sim-animations';

@Component({
    selector: 'fz-fz-demo-dropdown',
    templateUrl: './fz-demo-dropdown.component.html',
    styleUrls: ['./fz-demo-dropdown.component.scss'],
    animations: [
        boxAnimate,
        slideToRight,
        boxAnimateHover
    ]
})
export class FzDemoDropdownComponent implements OnInit {

    // 定义开始的状态
    boxState: String = 'left';
    private _isTrue: Boolean = true;

    // 定义路由动画
    @HostBinding('@routerAnimate') state;

    private boxHoverState: String = 'out';

    // 绑定一个鼠标移入改变状态
    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event) {
        console.log(event);
        this.boxHoverState = 'in';
    }

    // 绑定一个鼠标移出改变状态
    @HostListener('mouseleave')
    onmouseleave() {
        this.boxHoverState = 'out';
    }

    constructor() {
        console.log('FzDemoDropdownComponent create');
    }

    ngOnInit() {
    }

    start(): void {
        console.log('开始运动');
        if (this._isTrue) {
            this.boxState = 'right';
        } else {
            this.boxState = 'left';
        }
        this._isTrue = !this._isTrue;
    }

}
