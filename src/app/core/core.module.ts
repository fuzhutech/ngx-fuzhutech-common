import {NgModule, SkipSelf, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

import {MatIconRegistry} from '@angular/material';

import 'hammerjs';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';

import {loadSvgResource} from '../utils/svg.util';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        {
            provide: 'BASE_CONFIG',
            useValue: {
                uri: 'http://localhost:3000'
            }
        },
        // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule, ir: MatIconRegistry, ds: DomSanitizer) {
        if (parent) {
            throw new Error('模块已经存在，不能再次加载!');
        }

        loadSvgResource(ir, ds);
    }
}
