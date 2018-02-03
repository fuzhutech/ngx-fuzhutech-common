import {Directive, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PrismService} from '../../core/prism/prism.service';

@Directive({
    selector: '[fzHighlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {

    sub: Subscription;
    executed = false;

    constructor(public el: ElementRef, private prismService: PrismService) {
    }

    ngOnInit() {
        if (this.prismService.Prism) {
            this.executed = true;
            this.prismService.Prism.highlightElement(this.el.nativeElement);
        } else {
            this.sub = this.prismService.getChangeEmitter().subscribe(
                val => {
                    if (!this.executed && this.prismService.Prism) {
                        this.executed = true;
                        this.prismService.Prism.highlightElement(this.el.nativeElement);
                    }
                }
            );
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
            this.sub = null;
        }
    }

}
