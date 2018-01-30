import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';
import {User} from '../domain';

export const ActionTypes = {
    ADD: type('[User] Add'),
    ADD_SUCCESS: type('[User] Add Success'),
    ADD_FAIL: type('[User] Add Fail'),
    DELETE: type('[User] Delete'),
    DELETE_SUCCESS: type('[User] Delete Success'),
    DELETE_FAIL: type('[User] Delete Fail'),
    LOAD: type('[User] Load'),
    LOAD_SUCCESS: type('[User] Load Success'),
    LOAD_FAIL: type('[User] Load Fail'),
    SEARCH: type('[User] Search Users'),
    SEARCH_SUCCESS: type('[User] Search Users Success'),
    SEARCH_FAIL: type('[User] Search Users Fail'),
    UPDATE: type('[User] Update'),
    UPDATE_SUCCESS: type('[User] Update Success'),
    UPDATE_FAIL: type('[User] Update Fail'),
};

export class AddAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: User) {
    }
}

export class AddSuccessAction implements Action {
    type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: User) {
    }
}

export class AddFailAction implements Action {
    type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) {
    }
}

export class DeleteAction implements Action {
    type = ActionTypes.DELETE;

    constructor(public payload: User) {
    }
}

export class DeleteSuccessAction implements Action {
    type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: User) {
    }
}

export class DeleteFailAction implements Action {
    type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) {
    }
}

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor(public payload: any) {
    }
}

export class LoadSuccessAction implements Action {
    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export class LoadFailAction implements Action {
    type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) {
    }
}

export class SearchAction implements Action {
    type = ActionTypes.SEARCH;

    constructor(public payload: string) {
    }
}

export class SearchSuccessAction implements Action {
    type = ActionTypes.SEARCH_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export class SearchFailAction implements Action {
    type = ActionTypes.SEARCH_FAIL;

    constructor(public payload: string) {
    }
}

export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;

    constructor(public payload: User) {
    }
}

export class UpdateSuccessAction implements Action {
    type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: User) {
    }
}

export class UpdateFailAction implements Action {
    type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {
    }
}

export type Actions
    = AddAction
    | AddSuccessAction
    | AddFailAction
    | DeleteAction
    | DeleteSuccessAction
    | DeleteFailAction
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | SearchAction
    | SearchSuccessAction
    | SearchFailAction
    | UpdateAction
    | UpdateSuccessAction
    | UpdateFailAction
    ;
