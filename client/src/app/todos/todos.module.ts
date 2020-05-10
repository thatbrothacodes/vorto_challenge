import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TodosComponent } from './todos.component';
import { TodosRoutingModule } from './todos-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { ViewTodoComponent } from './components/view-todo/view-todo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TodosComponent,
    EditTodoComponent,
    DeleteTodoComponent,
    ViewTodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    TodosRoutingModule
  ],
  providers: [
    HttpClient
  ]
})
export class TodosModule { }
