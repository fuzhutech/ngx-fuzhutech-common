import {Input, Component, OnInit, ViewEncapsulation, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'fz-code-box',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './code-box.component.html',
    styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent implements OnInit {

    _code: string;
    _copied = false;

    @Input() fzTitle: string;
    @Input() fzExpanded = false;

    @Input()
    get fzCode(): string {
        return this._code;
    }

    set fzCode(value: string) {
        this._code = value;
    }

    copyCode(code) {
        this.copy(code).then(() => {
            this._copied = true;
            setTimeout(() => {
                this._copied = false;
            }, 1000);
        });
    }

    copy(value: string): Promise<string> {

        const promise = new Promise<string>(
            (resolve, reject): void => {
                let copyTextArea = null as HTMLTextAreaElement;
                try {
                    copyTextArea = this.dom.createElement('textarea');
                    copyTextArea.style.height = '0px';
                    copyTextArea.style.opacity = '0';
                    copyTextArea.style.width = '0px';
                    this.dom.body.appendChild(copyTextArea);
                    copyTextArea.value = value;
                    copyTextArea.select();
                    this.dom.execCommand('copy');
                    resolve(value);
                } finally {
                    if (copyTextArea && copyTextArea.parentNode) {
                        copyTextArea.parentNode.removeChild(copyTextArea);
                    }
                }
            }
        );

        return (promise);

    }

    constructor(@Inject(DOCUMENT) private dom: Document, private _el: ElementRef) {

    }

    ngOnInit() {
    }

}
