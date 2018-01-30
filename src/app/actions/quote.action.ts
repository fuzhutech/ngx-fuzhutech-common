import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';
import {Err, Quote} from '../domain';

export const ActionTypes = {
    LOAD: type('[Quote] Quote'),
    LOAD_SUCCESS: type('[Quote] Quote Success'),
    LOAD_FAIL: type('[Quote] Quote Fail')
};

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: any = null) {
    }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Quote) {
    }
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) {
    }
}


export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction
    ;
