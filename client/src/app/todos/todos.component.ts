import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { ViewTodoComponent } from './components/view-todo/view-todo.component';
import ITodo from './models/todo';
import { Store, select } from '@ngrx/store';
import { ITodoState } from '../store/state/todo.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetTodos } from '../store/actions/todo.actions';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Array<PeriodicElement> = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  todosSubscription: Subscription;
  todo$: Observable<ITodoState>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;
  editDialogRef: MatDialogRef<EditTodoComponent>;
  deleteDialogRef: MatDialogRef<DeleteTodoComponent>;
  viewDialogRef: MatDialogRef<ViewTodoComponent>;

  onEditClick = (id) => {
    this.editDialogRef = this.dialog.open(EditTodoComponent, {
      width: '400px',
      data: {
        id
      }
    });

    this.editDialogRef.componentInstance
      .cancel.subscribe(() => this.editDialogRef.close());
    this.editDialogRef.componentInstance
      .save.subscribe((todo: ITodo) => this.editDialogRef.close());
  }

  onDeleteClick = (id) => {
    this.deleteDialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '250px',
      data: {
        id
      }
    });

    this.deleteDialogRef.componentInstance
      .cancel.subscribe(() => this.deleteDialogRef.close());
    this.deleteDialogRef.componentInstance
      .delete.subscribe((todoId: number) => this.deleteDialogRef.close());
  }

  onViewClick = (id) => {
    this.viewDialogRef = this.dialog.open(ViewTodoComponent, {
      width: '400px',
      data: {
        id
      }
    });

    this.viewDialogRef.componentInstance
      .cancel.subscribe(() => this.viewDialogRef.close());
    this.viewDialogRef.componentInstance
      .edit.subscribe((todo: ITodo) => this.viewDialogRef.close());
  }

  onAddClick = () => {
    this.editDialogRef = this.dialog.open(EditTodoComponent, {
      width: '400px',
      data: {}
    });

    this.editDialogRef.componentInstance
      .cancel.subscribe(() => this.editDialogRef.close());
    this.editDialogRef.componentInstance
      .save.subscribe((todo: ITodo) => this.editDialogRef.close());
  }

  constructor(private dialog: MatDialog, private store: Store<{ todos: ITodoState }>) {
    this.todo$ = this.store.pipe(select('todos'));
  }
  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.todosSubscription = this.todo$.pipe(
      map(p => p.todos)
    ).subscribe();

    this.store.dispatch(new GetTodos());
  }

}
