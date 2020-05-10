import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ITodo from '../../models/todo';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss']
})
export class ViewTodoComponent {

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<ITodo> = new EventEmitter();

  onCancelClick = () => {
    this.cancel.emit();
  }

  onEditClick = (todo: ITodo) => {
    this.edit.emit(todo);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public todo: ITodo) { }

}
