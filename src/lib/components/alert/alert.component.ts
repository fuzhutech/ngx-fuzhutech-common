import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {fadeAnimation} from '../../core/animation/fade-animations';


@Component({
    selector: 'fz-alert',
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    private _closeable = false;
    private _showIcon = false;

    @Input() display = true;
    @Input() type: 'success' | 'info' | 'warn' | 'error' = 'info';
    @Input() description: string;
    @Input() closeText: string;
    @Input() message: string;
    @Output() closeClick: EventEmitter<boolean> = new EventEmitter();

    @Input()
    set showIcon(value: boolean) {
        this._showIcon = coerceBooleanProperty(value);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    @Input()
    set closeable(value: boolean) {
        this._closeable = coerceBooleanProperty(value);
    }

    get closeable(): boolean {
        return this._closeable;
    }


    get _classMap() {
        return {
            'fz-alert': true,
            [`fz-alert-${this.type}`]: true,
            'fz-alert-no-icon': !this.showIcon,
            // [`${this.antAlert}-banner`]: this.nzBanner,
            // [`${this.antAlert}-with-description`]: !!this.nzDescription
        };
    }

    get icon(): string {
        let icon: string = null;

        if (this.type) {
            switch (this.type) {
                case 'success':
                    icon = 'check_circle';
                    break;

                case 'info':
                    icon = 'info';
                    break;

                case 'error':
                    icon = 'error';
                    break;

                case 'warn':
                    icon = 'warning';
                    break;

                default:
                    icon = 'info';
                    break;
            }
        }

        return icon;
    }

    closeAlert(): void {
        this.display = false;
        this.closeClick.emit(true);
    }
}
