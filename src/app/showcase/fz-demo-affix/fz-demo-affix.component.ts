import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fz-fz-demo-affix',
    templateUrl: './fz-demo-affix.component.html',
    styleUrls: ['./fz-demo-affix.component.scss']
})
export class FzDemoAffixComponent implements OnInit {

    constructor() {
        console.log('FzDemoAffixComponent create');
    }

    ngOnInit() {
    }

    onChange(status: boolean) {
        console.log(status);
    }

}
