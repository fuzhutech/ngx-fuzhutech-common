/**-----------------------------------------*/
import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateSnapshot, Params} from '@angular/router';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
}

export class CustomRouterStateSerializer
    implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const {url} = routerState;
        const queryParams = routerState.root.queryParams;

        return {url, queryParams};
    }
}

/**------------------------------------------*/
import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
    Action
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromUsers from './user.reducer';
import * as fromTheme from './theme.reducer';

import {Auth} from '../domain';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    auth: Auth;
    quote: fromQuote.State;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    theme: fromTheme.State;
    users: fromUsers.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    quote: fromQuote.reducer,
    routerReducer: fromRouter.routerReducer,
    theme: fromTheme.reducer,
    users: fromUsers.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        // console.log('state', state);
        // console.log('action', action);

        return reducer(state, action);
    };
}

// noinspection TypeScriptValidateTypes
/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getUserState = (state: State) => state.users;
export const getThemeState = (state: State) => state.theme;

// 带【记忆】功能的函数运算，无论多少个参数，最后一个才是用于函数计算，其他的都是它的输入
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getUsers = createSelector(getUserState, fromUsers.getUsers);
export const getTheme = createSelector(getThemeState, fromTheme.getTheme);

const getCurrentAuth = createSelector(getAuthState, fromAuth.getAuth);
const getUserEntities = createSelector(getUserState, fromUsers.getEntities);
export const getAuth = createSelector(getCurrentAuth, getUserEntities, (_auth, _entities) => {
    return {..._auth, user: _entities[_auth.userId]};
});
export const getAuthUser = createSelector(getCurrentAuth, getUserEntities, (_auth, _entities) => {
    return _entities[_auth.userId];
});
