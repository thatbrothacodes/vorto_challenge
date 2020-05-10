import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { todosReducers } from './todos.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    todos: todosReducers
};
