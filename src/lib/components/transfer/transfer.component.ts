// tslint:disable:member-ordering
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
// import {NzLocaleService} from '../locale/index';
import {TransferItem} from './item';


export interface TransferCanMove {
    direction: string;            // 数据方向	left,right
    list: TransferItem[];         // 数据源
}

export interface TransferChange {
    from: string;           // 数据方向	left,right
    to: string;             // 数据方向	left,right
    list: TransferItem[];   // 数据源
}

export interface TransferSearchChange {
    direction: string;   // 数据方向	left,right
    value: string;       // 搜索关键词
}

export interface TransferSelectChange {
    direction: string;
    checked: boolean;
    list: TransferItem[];
    item: TransferItem;
}

@Component({
    selector: 'fz-transfer',
    templateUrl: './transfer.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./transfer.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[class.fz-transfer]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnChanges {
    private _showSearch = false;

    leftFilter = '';
    rightFilter = '';

    // region: fields

    @Input() nzDataSource: TransferItem[] = [];  // 数据源，其中若数据属性 direction: 'right' 将会被渲染到右边一栏中
    @Input() nzTitles: string[] = [];            // 标题集合，顺序从左至右
    @Input() nzOperations: string[] = [];        // 操作文案集合，顺序从下至上
    @Input() nzListStyle: object;                // 两个穿梭框的自定义样式，等同 ngStyle
    @Input() nzItemUnit = '项';                  // 单数单位
    @Input() nzItemsUnit = '项';                 // 复数单位
    // 穿梭时二次校验。注意： 穿梭组件内部始终只保留一份数据，二次校验过程中需取消穿梭项则直接删除该项；具体用法见示例。
    @Input() canMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);
    @ContentChild('render') render: TemplateRef<void>;  // 每行数据渲染模板
    @ContentChild('footer') footer: TemplateRef<void>;  // 底部渲染模板

    // search  是否显示搜索框
    @Input()
    set nzShowSearch(value: boolean) {
        this._showSearch = coerceBooleanProperty(value);
    }

    get nzShowSearch(): boolean {
        return this._showSearch;
    }

    // 接收 inputValueoption 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
    @Input() nzFilterOption: (inputValue: string, item: TransferItem) => boolean;
    // 搜索框的默认值
    @Input() nzSearchPlaceholder = '请输入搜索内容';
    // 当列表为空时显示的内容
    @Input() nzNotFoundContent = '无匹配结果';
    // events
    @Output() nzChange: EventEmitter<TransferChange> = new EventEmitter();  // 选项在两栏之间转移时的回调函数
    @Output() nzSearchChange: EventEmitter<TransferSearchChange> = new EventEmitter();  // 搜索框内容时改变时的回调函数
    @Output() nzSelectChange: EventEmitter<TransferSelectChange> = new EventEmitter();  // 选中项发生改变时的回调函数

    // endregion

    // region: process data

    // left
    leftDataSource: TransferItem[] = [];

    // right
    rightDataSource: TransferItem[] = [];

    private splitDataSource(): void {
        this.leftDataSource = [];
        this.rightDataSource = [];
        this.nzDataSource.forEach(record => {
            if (record.direction === 'right') {
                this.rightDataSource.push(record);
            } else {
                this.leftDataSource.push(record);
            }
        });
    }

    private getCheckedData(direction: string): TransferItem[] {
        return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
    }

    handleLeftSelectAll = (checked: boolean) => this.handleSelect('left', checked);
    handleRightSelectAll = (checked: boolean) => this.handleSelect('right', checked);

    handleLeftSelect = (item: TransferItem) => this.handleSelect('left', item.checked, item);
    handleRightSelect = (item: TransferItem) => this.handleSelect('right', item.checked, item);

    handleSelect(direction: 'left' | 'right', checked: boolean, item?: TransferItem): void {
        const list = this.getCheckedData(direction);
        this.updateOperationStatus(direction, list.length);
        this.nzSelectChange.emit({direction, checked, list, item});
    }

    handleFilterChange(ret: { direction: string, value: string }): void {
        this.nzSearchChange.emit(ret);
        this.cd.detectChanges();
    }

    // endregion

    // region: operation

    leftActive = false;
    rightActive = false;

    private updateOperationStatus(direction: string, count?: number): void {
        this[direction === 'right' ? 'leftActive' : 'rightActive']
            = (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
        this.cd.detectChanges();
    }

    moveToLeft = () => this.moveTo('left');
    moveToRight = () => this.moveTo('right');

    moveTo(direction: string): void {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        this.updateOperationStatus(oppositeDirection, 0);
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const moveList = datasource.filter(item => item.checked === true && !item.disabled);
        this.canMove({direction, list: moveList})
            .subscribe(
                newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)),
                () => moveList.forEach(i => i.checked = false)
            );
    }

    private truthMoveTo(direction: string, list: TransferItem[]): void {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
        for (const item of list) {
            const idx = datasource.indexOf(item);
            if (idx === -1) {
                continue;
            }
            item.checked = false;
            targetDatasource.push(item);
            datasource.splice(idx, 1);
        }
        this.updateOperationStatus(oppositeDirection);
        this.nzChange.emit({
            from: oppositeDirection,
            to: direction,
            list
        });
        // this.nzSelectChange.emit({ direction: oppositeDirection, list: [] });
    }

    // endregion

    constructor(/*private _locale: NzLocaleService,*/ private el: ElementRef, private cd: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('nzDataSource' in changes || 'nzTargetKeys' in changes) {
            this.splitDataSource();
            this.updateOperationStatus('left');
            this.updateOperationStatus('right');
        }
        this.cd.detectChanges();
    }
}
