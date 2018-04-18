import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'fz-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

    _sidebarOpen = true;

    @ViewChild('sidebarContainerElement') sidebarContainerElement: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    get containerStyle() {
        const sidebarWidth = this.sidebarContainerElement.nativeElement.offsetWidth;
        return {'width': this._sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : 'calc(100% - 10px)'};
    }

}
