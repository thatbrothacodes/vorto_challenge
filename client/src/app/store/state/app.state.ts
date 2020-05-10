import { ITodoState, initialTodoState } from './todo.state';

export interface IAppState {
    todos: ITodoState;
}

export const initialAppState: IAppState =  {
    todos: initialTodoState
};

export const getInitialState = (): IAppState => {
    return initialAppState;
};
