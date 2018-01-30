import {createSelector} from '@ngrx/store';

import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import {covertArrToObj, buildObjFromArr} from '../utils/reduer.util';
import {User, Auth} from '../domain';

import * as _ from 'lodash';


export interface State {
    ids: string [];
    entities: { [id: string]: User };
}

export const initialState: State = {
    ids: [],
    entities: {}
};

const addUser = (state, action) => {
    const project = action.payload;
    if (state.entities[project.id]) {
        return state;
    }
    const ids = [...state.ids, project.id];
    const entities = {...state.entities, [project.id]: project};
    return {...state, ids: ids, entities: entities};
};

const delUser = (state, action) => {
    const project = action.payload;
    const ids = state.ids.filter(id => id !== project.id);
    if (ids.length === 0) {
        return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: project.id === state.selectedId ? null : state.selectedId
    };
};

const updateUser = (state: State, action) => {
    const project = action.payload;
    const newEntities = {...state.entities, [project.id]: project};
    return {...state, entities: newEntities};
};

// 有数据分页，需要叠加
const loadUsers = (state, action) => {
    const projects: User[] = action.payload;
    // if projects is null then return the orginal state
    if (projects === null) {
        return state;
    }
    const newProjects = projects.filter(project => !state.entities[project.id]);
    const newIds = newProjects.map(project => project.id);
    if (newProjects.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(newProjects);
    return {
        ids: [...state.ids, ...newIds],
        entities: {...state.entities, ...newEntities},
        selectedId: null
    };
};

const loadUser = (state, action) => {
    const projects = action.payload;

    const incomingIds = projects.map((p: User) => p.id);
    const newIds = _.difference(incomingIds, state.ids);
    const incomingEntities = _.chain(projects)
        .keyBy('id')
        .mapValues(o => o)
        .value();
    const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incomingEntities[id]}));
    return {
        ids: [...state.ids, ...newIds],
        entities: {...state.entities, ...newEntities},
        selectedId: null
    };
};

const register = (state, action) => {
    const auth = <Auth>action.payload;
    if (state.ids.indexOf(auth.userId) > -1) {
        return {...state, entities: {...state.entities, [auth.user.id]: auth.user}};
    } else {
        return {
            ids: [...state.ids, auth.user.id],
            entities: {...state.entities, [auth.user.id]: auth.user}
        };
    }
};

const searchUsers = (state, action) => {
    const users = <User[]>action.payload;
    if (users === null) {
        return state;
    }
    const newUsers = users.filter(user => !state.entities[user.id]);
    const newIds = newUsers.map(user => user.id);
    if (newIds.length === 0) {
        return state;
    }
    const newEntities = covertArrToObj(newUsers);
    return {
        ids: [...state.ids, ...newIds],
        entities: {...state.entities, ...newEntities}
    };
};

// 内存数据
export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case authActions.ActionTypes.LOGIN_SUCCESS:
        case authActions.ActionTypes.REGISTER_SUCCESS:
            return register(state, action);
        case actions.ActionTypes.SEARCH_SUCCESS:
            return searchUsers(state, action);
        case actions.ActionTypes.ADD_SUCCESS:
            return addUser(state, action);
        case actions.ActionTypes.DELETE_SUCCESS:
            return delUser(state, action);
        case actions.ActionTypes.UPDATE_SUCCESS:
            return updateUser(state, action);
        case actions.ActionTypes.LOAD_SUCCESS:
            return loadUsers(state, action);
        default:
            return state;
    }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getUsers = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getSelectedId = (state) => state.selectedId;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
