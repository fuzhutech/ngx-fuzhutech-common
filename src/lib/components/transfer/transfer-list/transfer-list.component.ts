// tslint:disable:member-ordering
import {
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    IterableDiffer,
    IterableDiffers,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {TransferItem} from '../item';

@Component({
    selector: 'fz-transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnChanges, OnInit, DoCheck {
    private _showSearch = false;

    // region: fields

    @Input() direction = '';
    @Input() titleText = '';

    @Input() dataSource: TransferItem[] = [];  // 数据源，其中若数据属性 direction: 'right' 将会被渲染到右边一栏中

    @Input() itemUnit = ''; // 单数单位
    @Input() itemsUnit = ''; // 复数单位
    @Input() filter = '';

    // search
    @Input()
    set showSearch(value: boolean) {
        this._showSearch = coerceBooleanProperty(value);
    }

    get showSearch(): boolean {
        return this._showSearch;
    }

    @Input() searchPlaceholder: string;  // 搜索框的默认值
    @Input() notFoundContent: string;    // 当列表为空时显示的内容
    // 接收 inputValueoption 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
    @Input() filterOption: (inputValue: string, item: TransferItem) => boolean;
    @Input() render: TemplateRef<void>;  // 每行数据渲染模板
    @Input() footer: TemplateRef<void>;  // 底部渲染模板

    // events
    @Output() handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() handleSelect: EventEmitter<TransferItem> = new EventEmitter();
    @Output() filterChange: EventEmitter<{ direction: string, value: string }> = new EventEmitter();

    // endregion

    // region: styles

    _prefixCls = 'ant-transfer-list';
    _classList: string[] = [];

    _setClassMap(): void {
        this._classList.forEach(cls => this._renderer.removeClass(this._el.nativeElement, cls));

        this._classList = [
            this._prefixCls,
            !!this.footer && `${this._prefixCls}-with-footer`
        ].filter(item => !!item);

        this._classList.forEach(cls => this._renderer.addClass(this._el.nativeElement, cls));
    }

    // endregion

    // region: select all

    stat = {
        checkAll: false,
        checkHalf: false,
        checkCount: 0,
        shownCount: 0
    };

    onHandleSelectAll(status: boolean): void {
        this.dataSource.forEach(item => {
            if (!item.disabled && !item._hiden) {
                item.checked = status;
            }
        });

        // // ngModelChange 事件内对状态的变更会无效，因此使用延迟改变执行顺序
        // setTimeout(() => this.updateCheckStatus());
        this.updateCheckStatus();
        this.handleSelectAll.emit(status);
    }

    private updateCheckStatus(): void {
        const validCount = this.dataSource.filter(w => !w.disabled).length;
        this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
        this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
        this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
        this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    }

    // endregion

    // region: search

    handleFilter(value: string): void {
        this.filter = value;
        this.dataSource.forEach(item => {
            item._hiden = value.length > 0 && !this.matchFilter(value, item);
        });
        this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
        this.filterChange.emit({direction: this.direction, value});
    }

    handleClear(): void {
        this.handleFilter('');
    }

    private matchFilter(text: string, item: TransferItem): boolean {
        if (this.filterOption) {
            return this.filterOption(text, item);
        }
        return item.title.includes(text);
    }

    // endregion

    _listDiffer: IterableDiffer<{}>;

    constructor(private _el: ElementRef, private _renderer: Renderer2, differs: IterableDiffers) {
        this._listDiffer = differs.find([]).create(null);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('footer' in changes) {
            this._setClassMap();
        }
    }

    ngOnInit(): void {
        this._setClassMap();
    }

    ngDoCheck(): void {
        const change = this._listDiffer.diff(this.dataSource);
        if (change) {
            this.updateCheckStatus();
        }
    }

    _handleSelect(item: TransferItem, event): void {
        if (item.disabled) {
            return;
        }
        console.log(item.checked, !item.checked);
        item.checked = !item.checked;
        this.updateCheckStatus();
        this.handleSelect.emit(item);
        event.preventDefault();
        event.stopPropagation();
    }
}
