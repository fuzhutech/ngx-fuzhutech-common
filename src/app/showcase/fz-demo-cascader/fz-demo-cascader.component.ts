import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-cascader',
    templateUrl: './fz-demo-cascader.component.html',
    styleUrls: ['./fz-demo-cascader.component.scss']
})
export class FzDemoCascaderComponent implements OnInit {

    /** init data */
    _options = null;
    _value: any[] = null;

    constructor() {
    }

    ngOnInit() {
        // let's set nzOptions in a asynchronous  way
        setTimeout(() => {
            this._options = init_options;
        }, 100);
    }

    _console(value) {
        console.log(value);
    }

    _changeNzOptions(): void {
        if (this._options === init_options) {
            this._options = other_options;
        } else {
            this._options = init_options;
        }
    }

}

const init_options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
        }],
    }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
        }],
    }],
}];

const other_options = [{
    value: 'fujian',
    label: 'Fujian',
    children: [{
        value: 'xiamen',
        label: 'Xiamen',
        children: [{
            value: 'Kulangsu',
            label: 'Kulangsu',
            isLeaf: true
        }],
    }],
}, {
    value: 'guangxi',
    label: 'Guangxi',
    children: [{
        value: 'guilin',
        label: 'Guilin',
        children: [{
            value: 'Lijiang',
            label: 'Li Jiang River',
            isLeaf: true
        }],
    }],
}];
