import { Action } from '@ngrx/store';
import ITodo from 'src/app/todos/models/todo';

export enum TodoActionTypes {
    GET_TODOS_REQUEST = '[TODOS] GET TODOS REQUEST',
    GET_TODOS_SUCCESS = '[TODOS] GET TODOS SUCCESS',
    GET_TODOS_FAILURE = '[TODOS] GET TODOS FAILURE',
    GET_TODO_REQUEST = '[TODOS] GET TODO REQUEST',
    GET_TODO_SUCCESS = '[TODOS] GET TODO SUCCESS',
    GET_TODO_FAILURE = '[TODOS] GET TODO FAILURE',
    CREATE_TODO_REQUEST = '[TODOS] CREATE TODO REQUEST',
    CREATE_TODO_SUCCESS = '[TODOS] CREATE TODO SUCCESS',
    CREATE_TODO_FAILURE = '[TODOS] CREATE TODO FAILURE',
    EDIT_TODO_REQUEST = '[TODOS] EDIT TODO REQUEST',
    EDIT_TODO_SUCCESS = '[TODOS] EDIT TODO SUCCESS',
    EDIT_TODO_FAILURE = '[TODOS] EDIT TODO FAILURE',
    DELETE_TODO_REQUEST = '[TODOS] DELETE TODO REQUEST',
    DELETE_TODO_SUCCESS = '[TODOS] DELETE TODO SUCCESS',
    DELETE_TODO_FAILURE = '[TODOS] DELETE TODO FAILURE'
}

export class GetTodos implements Action {
    public readonly type = TodoActionTypes.GET_TODOS_REQUEST;
    constructor(public page = 0, public pageSize = 10) {}
}

export class GetTodosSuccess implements Action {
    public readonly type = TodoActionTypes.GET_TODOS_SUCCESS;
    public constructor(public payload: Array<ITodo>) {}
}

export class GetTodosFailure implements Action {
    public readonly type = TodoActionTypes.GET_TODOS_FAILURE;
    public constructor(public error: string) {}
}

export class GetTodo implements Action {
    public readonly type = TodoActionTypes.GET_TODO_REQUEST;
    public constructor(public id: number) {}
}

export class GetTodoSuccess implements Action {
    public readonly type = TodoActionTypes.GET_TODO_SUCCESS;
    public constructor(public payload: ITodo) {}
}

export class GetTodoFailure implements Action {
    public readonly type = TodoActionTypes.GET_TODO_FAILURE;
    public constructor(public error: string) {}
}

export class CreateTodo implements Action {
    public readonly type = TodoActionTypes.CREATE_TODO_REQUEST;
    public constructor(public todo: ITodo) {}
}

export class CreateTodoSuccess implements Action {
    public readonly type = TodoActionTypes.CREATE_TODO_SUCCESS;
    public constructor(public payload: ITodo) {}
}

export class CreateTodoFailure implements Action {
    public readonly type = TodoActionTypes.CREATE_TODO_FAILURE;
    public constructor(public error: string) {}
}

export class EditTodo implements Action {
    public readonly type = TodoActionTypes.EDIT_TODO_REQUEST;
    public readonly id: number;

    public constructor(public todo: ITodo) {}
}

export class EditTodoSuccess implements Action {
    public readonly type = TodoActionTypes.EDIT_TODO_SUCCESS;
    public constructor(public payload: ITodo) {}
}

export class EditTodoFailure implements Action {
    public readonly type = TodoActionTypes.EDIT_TODO_FAILURE;
    public constructor(public error: string) {}
}

export class DeleteTodo implements Action {
    public readonly type = TodoActionTypes.DELETE_TODO_REQUEST;
    public constructor(public id: number) {}
}

export class DeleteTodoSuccess implements Action {
    public readonly type = TodoActionTypes.DELETE_TODO_SUCCESS;
    public constructor(public id: number) {}
}

export class DeleteTodoFailure implements Action {
    public readonly type = TodoActionTypes.DELETE_TODO_FAILURE;
    public constructor(public error: string) {}
}

export type TodoActions =
    GetTodos |
    GetTodosSuccess |
    GetTodosFailure |
    GetTodo |
    GetTodoSuccess |
    GetTodoFailure |
    CreateTodo |
    CreateTodoSuccess |
    CreateTodoFailure |
    EditTodo |
    EditTodoSuccess |
    EditTodoFailure |
    DeleteTodo |
    DeleteTodoSuccess |
    DeleteTodoFailure;
