import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { ViewTodoComponent } from './components/view-todo/view-todo.component';
import ITodo from './models/todo';
import { Store, select } from '@ngrx/store';
import { ITodoState } from '../store/state/todo.state';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetTodos, GetTodo, EditTodo, DeleteTodo, CreateTodo, TodoActionTypes } from '../store/actions/todo.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  todosSubscription: Subscription;
  createTodoSuccessSubscription: Subscription;
  deleteTodoSuccessSubscription: Subscription;
  editTodoSuccessSubscription: Subscription;
  todo$: Observable<ITodoState>;
  editDialogRef: MatDialogRef<EditTodoComponent>;
  deleteDialogRef: MatDialogRef<DeleteTodoComponent>;
  viewDialogRef: MatDialogRef<ViewTodoComponent>;

  id: number;
  todos: Array<ITodo> = [];
  todo: ITodo = undefined;
  displayedColumns: string[] = ['select', 'title', 'priority', 'created', 'actions'];
  dataSource = new MatTableDataSource<ITodo>([]);
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<ITodo>(this.allowMultiSelect, this.initialSelection);

  onEditClick = (id) => {
    this.id = id;
    this.store.dispatch(new GetTodo(id));

    this.editDialogRef = this.dialog.open(EditTodoComponent, {
      width: '400px',
      data: this.todo
    });

    this.editDialogRef.componentInstance
      .cancel.subscribe(() => {

        this.todo = undefined;
        this.editDialogRef.close();

      });

    this.editDialogRef.componentInstance
      .save.subscribe((todo: ITodo) => {

        this.store.dispatch(new EditTodo(id, todo));

      });
  }

  onDeleteClick = (id) => {

    this.id = id;
    this.store.dispatch(new GetTodo(id));

    this.deleteDialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '250px',
      data: this.todo
    });

    this.deleteDialogRef.componentInstance
      .cancel.subscribe(() => {

        this.todo = undefined;
        this.deleteDialogRef.close();

      });

    this.deleteDialogRef.componentInstance
      .delete.subscribe((todoId: number) => {

        this.store.dispatch(new DeleteTodo(todoId));
        this.deleteDialogRef.close();

      });
  }

  onViewClick = (id) => {

    this.id = id;
    this.store.dispatch(new GetTodo(id));

    this.viewDialogRef = this.dialog.open(ViewTodoComponent, {
      width: '400px',
      data: this.todo
    });

    this.viewDialogRef.componentInstance
      .cancel.subscribe(() => {

        this.todo = undefined;
        this.viewDialogRef.close();

      });

    this.viewDialogRef.componentInstance
      .edit.subscribe(() => {

        this.store.dispatch(new GetTodo(id));
        this.viewDialogRef.close();

      });
  }

  onAddClick = () => {

    this.id = undefined;

    this.editDialogRef = this.dialog.open(EditTodoComponent, {
      width: '400px',
      data: {} as ITodo
    });

    this.editDialogRef.componentInstance
      .cancel.subscribe(() => {

        this.todo = undefined;
        this.editDialogRef.close();

      });

    this.editDialogRef.componentInstance
      .save.subscribe((todo: ITodo) => {

        this.store.dispatch(new CreateTodo(todo));

      });
  }

  onArchiveClick = (id: number) => {
    const archivedTodo = {
      ...this.todo,
      archived: true,
      archivedDate: Date.now()
    };

    this.store.dispatch(new EditTodo(id, archivedTodo));
  }

  onUnarchiveClick = (id: number) => {
    const archivedTodo = {
      ...this.todo,
      archived: false,
      archivedDate: null
    };

    this.store.dispatch(new EditTodo(id, archivedTodo));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private dialog: MatDialog, private actions$: Actions, private store: Store<{ todos: ITodoState }>) {
    this.todo$ = this.store.pipe(select('todos'));
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }

    if (this.createTodoSuccessSubscription) {
      this.createTodoSuccessSubscription.unsubscribe();
    }

    if (this.editTodoSuccessSubscription) {
      this.editTodoSuccessSubscription.unsubscribe();
    }

    if (this.deleteTodoSuccessSubscription) {
      this.deleteTodoSuccessSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.todosSubscription = this.todo$.pipe(
      map(p => {
        this.dataSource = new MatTableDataSource<ITodo>(p.todos);
        this.todo = (this.id) ? p.todos.find((t: ITodo) => t.id === this.id) : null;
      })
    ).subscribe();

    this.createTodoSuccessSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.CREATE_TODO_SUCCESS),
      tap(() => {
        this.editDialogRef.close();
      })
    ).subscribe();

    this.editTodoSuccessSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.EDIT_TODO_SUCCESS),
      tap(() => {
        this.editDialogRef.close();
      })
    ).subscribe();

    this.deleteTodoSuccessSubscription = this.actions$.pipe(
      ofType(TodoActionTypes.DELETE_TODO_SUCCESS),
      tap(() => {
        this.deleteDialogRef.close();
      })
    ).subscribe();

    this.store.dispatch(new GetTodos());
  }

}
