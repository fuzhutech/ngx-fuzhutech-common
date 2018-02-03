import {Component, OnInit, ViewEncapsulation, Input, ElementRef, Renderer2, AfterViewInit, OnDestroy} from '@angular/core';
import {PrismService} from '../../core/prism/prism.service';
import * as marked from 'marked';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'fz-markdown',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit, AfterViewInit, OnDestroy {
    _parsedHTML = '';
    _el: HTMLElement;
    sub: Subscription;

    @Input()
    set nzContent(value) {
        this._parsedHTML = marked(value);
    }

    constructor(private _elementRef: ElementRef, private renderer: Renderer2, private prismService: PrismService) {
        this._el = this._elementRef.nativeElement;
    }

    ngAfterViewInit() {
        if (this.prismService.Prism) {
            const codes = this._el.querySelectorAll('code[class^=lang-]');
            [].forEach.call(codes, code => {
                const className = code.className;
                this.renderer.addClass(code, className.replace('lang', 'language'));
                // Prism.highlightElement(code);
                console.log('2222');
                this.prismService.Prism.highlightElement(code);
            });
        }
    }

    ngOnInit() {
        this.sub = this.prismService.getChangeEmitter().subscribe(
            val => {
                if (this.prismService.Prism) {
                    const codes = this._el.querySelectorAll('code[class^=lang-]');
                    [].forEach.call(codes, code => {
                        const className = code.className;
                        this.renderer.addClass(code, className.replace('lang', 'language'));
                        // Prism.highlightElement(code);
                        this.prismService.Prism.highlightElement(code);
                    });
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
