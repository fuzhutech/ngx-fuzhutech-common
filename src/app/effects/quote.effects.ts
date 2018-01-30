import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
// import {tap, map, exhaustMap, catchError} from 'rxjs/operators';

import {QuoteService} from '../services';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects {
    /**
     *
     */
    @Effect()
    quote$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOAD)
        .map((action: actions.LoadAction) => action.payload)
        .switchMap(() => this.quoteService
            .getQuote()
            .map(quote => new actions.LoadSuccessAction(quote))
            .catch(err => of(new actions.LoadFailAction(JSON.stringify(err))))
        );

    /**
     *
     * @param actions$
     * @param authService
     */
    constructor(private actions$: Actions, private quoteService: QuoteService) {
    }
}
