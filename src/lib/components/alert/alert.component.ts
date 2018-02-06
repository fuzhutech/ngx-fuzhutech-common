import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { fadeAnimation } from '../../core/animation/fade-animations';
import { toBoolean } from '../../util/convert';

@Component({
    selector     : 'fz-alert',
    encapsulation: ViewEncapsulation.None,
    animations   : [ fadeAnimation ],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {
    private _banner = false;
    private _closeable = false;
    private _showIcon = false;
    _display = true;
    antAlert = 'ant-alert';
    @Input() nzType = 'info';
    @Input() nzDescription: string;
    @Input() nzCloseText: string;
    @Input() nzMessage: string;
    @Output() nzOnClose: EventEmitter<boolean> = new EventEmitter();

    @Input()
    set nzBanner(value: boolean) {
        this._banner = toBoolean(value);
    }

    get nzBanner(): boolean {
        return this._banner;
    }

    @Input()
    set nzCloseable(value: boolean) {
        this._closeable = toBoolean(value);
    }

    get nzCloseable(): boolean {
        return this._closeable;
    }

    @Input()
    set nzShowIcon(value: boolean) {
        this._showIcon = toBoolean(value);
    }

    get nzShowIcon(): boolean {
        return this._showIcon;
    }

    _classMap = {
        [`${this.antAlert}`]                 : true,
        [`${this.antAlert}-${this.nzType}`]  : true,
        [`${this.antAlert}-no-icon`]         : !this.nzShowIcon,
        [`${this.antAlert}-banner`]          : this.nzBanner,
        [`${this.antAlert}-with-description`]: !!this.nzDescription
    };

    closeAlert(): void {
        this._display = false;
        this.nzOnClose.emit(true);
    }

    ngOnChanges(): void {
        this._classMap = {
            [`${this.antAlert}`]                 : true,
            [`${this.antAlert}-${this.nzType}`]  : true,
            [`${this.antAlert}-no-icon`]         : !this.nzShowIcon,
            [`${this.antAlert}-banner`]          : this.nzBanner,
            [`${this.antAlert}-with-description`]: !!this.nzDescription
        };
    }
}
