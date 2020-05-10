import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
    GetTodos,
    GetTodoSuccess,
    TodoActionTypes,
    GetTodosFailure,
    GetTodosSuccess,
    GetTodoFailure,
    CreateTodoSuccess,
    CreateTodoFailure,
    CreateTodo,
    GetTodo,
    EditTodo,
    DeleteTodo,
    EditTodoSuccess,
    EditTodoFailure,
    DeleteTodoFailure,
    DeleteTodoSuccess
} from '../actions/todo.actions';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import ITodo from 'src/app/todos/models/todo';


@Injectable()
export class TodoEffects {
    private ApiURL = 'https://localhost:3000/todos';

    @Effect()
    getTodos$ = this.actions$.pipe(
        ofType<GetTodos>(TodoActionTypes.GET_TODOS_REQUEST),
        mergeMap(action => {
            return this.http.get(this.ApiURL, {
                params: { pageSize: action.pageSize.toString(), page: action.page.toString()}
            }).pipe(
                    map((todos: Array<ITodo>) => of(new GetTodosSuccess(todos))),
                    catchError((err: Error) => of(new GetTodosFailure(err.message)))
                );
        })
    );

    @Effect()
    getTodo$ = this.actions$.pipe(
        ofType<GetTodo>(TodoActionTypes.GET_TODO_REQUEST),
        mergeMap(action => {
            return this.http.get(`${this.ApiURL}/${action.id}`).pipe(
                    map((todo: ITodo) => of(new GetTodoSuccess(todo))),
                    catchError((err: Error) => of(new GetTodoFailure(err.message)))
                );
        })
    );

    @Effect()
    createTodo$ = this.actions$.pipe(
        ofType<CreateTodo>(TodoActionTypes.CREATE_TODO_REQUEST),
        mergeMap(action => {
            return this.http.post(this.ApiURL, action.todo).pipe(
                    map((todo: ITodo) => of(new CreateTodoSuccess(todo))),
                    catchError((err: Error) => of(new CreateTodoFailure(err.message)))
                );
        })
    );

    @Effect()
    editTodo$ = this.actions$.pipe(
        ofType<EditTodo>(TodoActionTypes.EDIT_TODO_REQUEST),
        mergeMap(action => {
            return this.http.put(`${this.ApiURL}/${action.id}`, action.todo).pipe(
                    map((todo: ITodo) => of(new EditTodoSuccess(todo))),
                    catchError((err: Error) => of(new EditTodoFailure(err.message)))
                );
        })
    );

    @Effect()
    deleteTodo$ = this.actions$.pipe(
        ofType<DeleteTodo>(TodoActionTypes.DELETE_TODO_REQUEST),
        mergeMap(action => {
            return this.http.delete(`${this.ApiURL}/${action.id}`).pipe(
                    map(() => of(new DeleteTodoSuccess())),
                    catchError((err: Error) => of(new DeleteTodoFailure(err.message)))
                );
        })
    );

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) {}
}
