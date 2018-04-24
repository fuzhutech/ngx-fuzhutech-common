export interface TransferItem {
    title: string;   // 标题，用于显示及搜索关键字判断
    direction?: 'left' | 'right';  // 指定数据方向，若指定 right 为右栏，其他情况为左栏
    disabled?: boolean;  // 指定checkbox为不可用状态
    checked?: boolean;   // 指定checkbox为选中状态
    _hiden?: boolean;

    /* tslint:disable-next-line:no-any */
    [key: string]: any;
}
