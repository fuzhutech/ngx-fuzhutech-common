import {Directive, ElementRef, OnInit} from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

@Directive({
    selector: '[fzHighlight]'
})
export class HighlightDirective implements OnInit {

    constructor(public el: ElementRef) {
    }

    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
        /*if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }*/
    }

}
