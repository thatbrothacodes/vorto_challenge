import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { TodoActionTypes, DeleteTodoFailure } from './store/actions/todo.actions';
import { tap } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  getTodosError$: Observable<string>;
  getTodoError$: Observable<string>;
  createTodosError$: Observable<string>;
  deleteTodosError$: Observable<string>;
  editTodosError$: Observable<string>;
  getTodosErrorSubscription: Subscription;
  getTodoErrorSubscription: Subscription;
  createTodoSubscription: Subscription;
  deleteTodoSubscription: Subscription;
  editTodoSubscription: Subscription;

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  ngOnDestroy(): void {

    if (this.getTodosErrorSubscription) {
      this.getTodosErrorSubscription.unsubscribe();
    }

    if (this.getTodoErrorSubscription) {
      this.getTodoErrorSubscription.unsubscribe();
    }

    if (this.createTodoSubscription) {
      this.createTodoSubscription.unsubscribe();
    }

    if (this.editTodoSubscription) {
      this.editTodoSubscription.unsubscribe();
    }

    if (this.deleteTodoSubscription) {
      this.deleteTodoSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.getTodosErrorSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.GET_TODOS_FAILURE),
      tap(() => {
        this.snackBar.open('Error Retrieving Todos!', 'Error', {
          verticalPosition: 'top',
          panelClass: 'warningSnackBar',
          duration: 100000
        });
      })
    ).subscribe();

    this.getTodoErrorSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.GET_TODO_FAILURE),
      tap(() => {
        this.snackBar.open('Error Retrieving Todo!', 'Error', {
          verticalPosition: 'top',
          panelClass: 'warningSnackBar',
          duration: 10000
        });
      })
    ).subscribe();

    this.createTodoSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.CREATE_TODO_SUCCESS),
      tap(() => {
        this.snackBar.open('Todo Created!', 'Success', {
          verticalPosition: 'top',
          panelClass: 'succssSnackBar',
          duration: 10000
        });
      }),
      ofType(TodoActionTypes.CREATE_TODO_FAILURE),
      tap(() => {
        this.snackBar.open('Error Creating Todo!', 'Error', {
          verticalPosition: 'top',
          panelClass: 'warningSnackBar',
          duration: 10000
        });
      })
    ).subscribe();

    this.editTodoSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.EDIT_TODO_SUCCESS),
      tap(() => {
        this.snackBar.open('Todo Updated!', 'Success', {
          verticalPosition: 'top',
          panelClass: 'succssSnackBar',
          duration: 10000
        });
      }),
      ofType(TodoActionTypes.EDIT_TODO_FAILURE),
      tap(() => {
        this.snackBar.open('Error Updating Todo!', 'Error', {
          verticalPosition: 'top',
          panelClass: 'warningSnackBar',
          duration: 10000
        });
      })
    ).subscribe();

    this.deleteTodoSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.DELETE_TODO_SUCCESS),
      tap(() => {
        this.snackBar.open('Todo Deleted!', 'Success', {
          verticalPosition: 'top',
          panelClass: 'succssSnackBar',
          duration: 10000
        });
      }),
      ofType(TodoActionTypes.DELETE_TODO_FAILURE),
      tap(() => {
        this.snackBar.open('Error Deleting Todo!', 'Error', {
          verticalPosition: 'top',
          panelClass: 'warningSnackBar'
        });
      })
    ).subscribe();
  }
}
