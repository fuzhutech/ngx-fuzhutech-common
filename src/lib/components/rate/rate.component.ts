import {
    forwardRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const RATING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RateComponent),
    multi: true
};

@Component({
    selector: 'fz-rate',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rate.component.html',
    providers: [RATING_VALUE_ACCESSOR],
    styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit, ControlValueAccessor {

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars = 5;

    @Input() cancel = true;

    @Input() iconOnName = 'star';

    @Input() iconOnClass = 'star-icon-on';

    @Input() iconOnStyle: any;

    @Input() iconOffName = 'star_border';

    @Input() iconOffClass = 'star-icon-off';

    @Input() iconOffStyle: any;

    @Input() iconCancelName = 'cancel';

    @Input() iconCancelClass = 'star-icon-cancel';

    @Input() iconCancelStyle: any;

    @Output() rateClick: EventEmitter<any> = new EventEmitter();

    @Output() cancelClick: EventEmitter<any> = new EventEmitter();

    public starsArray: number[];

    value: number;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }

        console.log(this.value);
    }

    rate(event, i: number): void {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.rateClick.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    }

    clear(event): void {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.cancelClick.emit(event);
        }
        event.preventDefault();
    }

    writeValue(value: any): void {
        this.value = value;
        this.cd.detectChanges();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
}
