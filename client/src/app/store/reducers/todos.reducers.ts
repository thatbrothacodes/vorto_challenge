import { ITodoState, initialTodoState } from '../state/todo.state';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';


export const todosReducers = (
    todoState: ITodoState = initialTodoState,
    action: TodoActions
): ITodoState => {
    switch (action.type) {
        case TodoActionTypes.GET_TODOS_REQUEST: {
            return {
                ...todoState,
                loading: true,
                error: undefined
            };
        }
        case TodoActionTypes.GET_TODOS_SUCCESS: {
            return {
                ...todoState,
                todos: [
                    ...todoState.todos,
                    ...action.payload
                ],
                loading: false,
                error: undefined
            };
        }
        case TodoActionTypes.GET_TODOS_FAILURE: {
            return {
                ...todoState,
                loading: false,
                error: action.error
            };
        }
        case TodoActionTypes.GET_TODO_REQUEST: {
            return {
                ...todoState,
                loading: true,
                error: undefined
            };
        }
        case TodoActionTypes.GET_TODO_SUCCESS: {
            return {
                ...todoState,
                todos: [
                    ...todoState.todos.filter(p => p.id !== action.payload.id),
                    action.payload
                ],
                loading: false,
                error: undefined
            };
        }
        case TodoActionTypes.GET_TODO_FAILURE: {
            return {
                ...todoState,
                loading: false,
                error: action.error
            };
        }

        case TodoActionTypes.CREATE_TODO_REQUEST: {
            return {
                ...todoState,
                loading: true,
                error: undefined
            };
        }
        case TodoActionTypes.CREATE_TODO_SUCCESS: {
            return {
                ...todoState,
                todos: [
                    ...todoState.todos,
                    action.payload
                ],
                loading: false,
                error: undefined
            };
        }
        case TodoActionTypes.CREATE_TODO_FAILURE: {
            return {
                ...todoState,
                loading: false,
                error: action.error
            };
        }

        case TodoActionTypes.EDIT_TODO_REQUEST: {
            return {
                ...todoState,
                loading: true,
                error: undefined
            };
        }
        case TodoActionTypes.EDIT_TODO_SUCCESS: {
            return {
                ...todoState,
                todos: [
                    ...todoState.todos.filter(p => p.id !== action.payload.id),
                    action.payload
                ],
                loading: false,
                error: undefined
            };
        }
        case TodoActionTypes.EDIT_TODO_FAILURE: {
            return {
                ...todoState,
                loading: false,
                error: action.error
            };
        }

        case TodoActionTypes.DELETE_TODO_REQUEST: {
            return {
                ...todoState,
                loading: true,
                error: undefined
            };
        }
        case TodoActionTypes.DELETE_TODO_SUCCESS: {
            return {
                ...todoState,
                todos: [
                    ...todoState.todos.filter(p => p.id !== action.id)
                ],
                loading: false,
                error: undefined
            };
        }
        case TodoActionTypes.DELETE_TODO_FAILURE: {
            return {
                ...todoState,
                loading: false,
                error: action.error
            };
        }

        default:
            return todoState;
    }
};
