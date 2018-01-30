import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {UserService} from '../services';
import * as actions from '../actions/user.action';
import * as fromRoot from '../reducers';

@Injectable()
export class UserEffects {
    /**
     *
     */
    @Effect()
    searchUsers$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SEARCH)
        .map((action: actions.SearchAction) => action.payload)
        .switchMap((str) => this.service
            .searchUsers(str)
            .map(users => new actions.SearchSuccessAction(users))
            .catch(err => of(new actions.SearchFailAction(JSON.stringify(err))))
        );

    @Effect()
    addUser$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map((action: actions.AddAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth))
        .switchMap(([user, auth]) => {
                const added = {...user, members: [`${auth.user.id}`]};
                return this.service
                    .add(added)
                    .map(returned => new actions.AddSuccessAction(returned))
                    .catch(err => of(new actions.AddFailAction(JSON.stringify(err))));
            }
        );

    @Effect()
    updateUser$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map((action: actions.UpdateAction) => action.payload)
        .switchMap(project => this.service
            .update(project)
            .map(returned => new actions.UpdateSuccessAction(returned))
            .catch(err => of(new actions.UpdateFailAction(JSON.stringify(err))))
        );

    @Effect()
    removeProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map((action: actions.DeleteAction) => action.payload)
        .switchMap(project => this.service
            .del(project)
            .map(returned => new actions.DeleteSuccessAction(returned))
            .catch(err => of(new actions.DeleteFailAction(JSON.stringify(err))))
        );

    /**
     * 任务的 Effects
     * @param actions$ 注入 action 数据流
     * @param service 注入任务服务
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
                private service: UserService,
                private store$: Store<fromRoot.State>) {
    }
}
