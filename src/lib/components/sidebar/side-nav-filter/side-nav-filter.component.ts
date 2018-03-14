import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';

@Component({
    selector: 'fz-side-nav-filter',
    templateUrl: './side-nav-filter.component.html',
    styleUrls: ['./side-nav-filter.component.scss']
})
export class SideNavFilterComponent implements OnInit {

    hide = true;
    searchValue = new FormControl();

    $items: Observable<any>;
    private observer: Observer<any>;

    constructor() {
        this.searchValue.valueChanges
            .debounceTime(400)  // 控制用户输入延时 当用户停止输入的时间超过400毫秒，就触发搜索。如果用户一直不停的输入，输入的时间间隔小于400ms就不触发
            .distinctUntilChanged() // 防止触发两次 判断从消息源过来的新数据跟上次的数据是否一致，只有不一致才会触发订阅的方法
            .map(value => {
                console.log('map:', value);
                return value;
            })
            .switchMap(value => this.search(value))
            .subscribe(items => {
                console.log(items);
            });
    }

    ngOnInit() {
    }

    // https://segmentfault.com/a/1190000008809168
    search(value) {
        return Observable.of(value).debounceTime(4000);
    }

}
