import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ITodo from '../../models/todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent {

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<ITodo> = new EventEmitter();

  onCancelClick = () => {
    this.cancel.emit();
  }

  onSaveClick = (todo: ITodo) => {
    this.save.emit(todo);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public todo: ITodo) { }

}
