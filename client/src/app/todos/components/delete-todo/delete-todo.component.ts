import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ITodo from '../../models/todo';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent {

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  onCancelClick = () => {
    this.cancel.emit();
  }

  onDeleteClick = (todo: ITodo) => {
    this.delete.emit(todo.id);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public todo: ITodo) { }

}
