import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[fzDropdown]',
  host: {
    '[class.ant-dropdown-trigger]': 'true'
  }
})
export class DropDownDirective {
  constructor(public elementRef: ElementRef) {
  }
}
