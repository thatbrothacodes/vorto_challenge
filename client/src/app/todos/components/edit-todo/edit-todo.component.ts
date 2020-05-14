import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ITodo from '../../models/todo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent {

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<ITodo> = new EventEmitter();

  title = this.todo.title;
  notes = this.todo.notes;
  dueDate = this.todo.dueDate;
  priority = this.todo.priority;

  onCancelClick = () => {
    this.cancel.emit();
  }

  onSubmit = (form: NgForm) => {
    if (form.valid) {
      this.save.emit({
        ...this.todo,
        ...form.value
      });
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) public todo: ITodo) { }

}
