import { ITodoState, initialTodoState } from '../state/todo.state';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { state } from '@angular/animations';


export const todosReducers = (
    todoState: ITodoState = initialTodoState,
    action: TodoActions
): ITodoState => {
    switch (action.type) {
        case TodoActionTypes.GET_TODOS_REQUEST: {
            return {
                ...todoState,
                loading: true
            };
        }
        case TodoActionTypes.GET_TODOS_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...todoState.todos,
                    ...action.payload
                ],
                loading: false
            };
        }
        case TodoActionTypes.GET_TODOS_FAILURE: {
            return {
                ...todoState,
                loading: false
            };
        }
        case TodoActionTypes.GET_TODO_REQUEST: {
            return {
                ...todoState,
                loading: true
            };
        }
        case TodoActionTypes.GET_TODO_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...todoState.todos,
                    action.payload
                ],
                loading: false
            };
        }
        case TodoActionTypes.GET_TODO_FAILURE: {
            return {
                ...todoState,
                loading: false
            };
        }

        default:
            return todoState;
    }
};
