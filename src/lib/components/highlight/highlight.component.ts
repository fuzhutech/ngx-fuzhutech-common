import {Component, ElementRef, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PrismService} from '../../core/prism/prism.service';

@Component({
    selector: 'fz-highlight',
    templateUrl: './highlight.component.html',
    styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit, OnDestroy {

    _code;
    _displayCode;
    sub: Subscription;
    @ViewChild('code') codeElement: ElementRef;
    @Input() fzLanguage: string;

    @Input()
    get fzCode(): string {
        return this._displayCode || '';
    }

    set fzCode(value: string) {
        this._code = value;
        if (value && this.prismService.Prism) {
            this._displayCode = this.prismService.Prism.highlight(value, (this.prismService.Prism.languages as any).javascript);
        } else {
            this._displayCode = this._code;
        }
    }

    constructor(private prismService: PrismService) {
    }

    ngOnInit() {
        this.sub = this.prismService.getChangeEmitter().subscribe(
            val => {
                if (this._code && this.prismService.Prism) {
                    this._displayCode
                        = this.prismService.Prism.highlight(this._code, (this.prismService.Prism.languages as any).javascript);
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
            this.sub = null;
        }
    }

}
