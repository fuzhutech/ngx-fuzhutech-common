import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import * as Prism from 'prismjs';

@Component({
    selector: 'fz-highlight',
    templateUrl: './highlight.component.html',
    styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

    _code;
    @ViewChild('code') codeElement: ElementRef;
    @Input() fzLanguage: string;

    @Input()
    get fzCode(): string {
        return this._code || '';
    }

    set fzCode(value: string) {
        this._code = (Prism as any).highlight(value, (Prism.languages as any).javascript);
    }

    constructor() {
    }

    ngOnInit() {
    }

}
