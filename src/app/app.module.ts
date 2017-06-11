import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodoService } from "./services/todo.service";
import { TodoListComponent } from "./todoList.component";
import { AddTodoComponent } from "./addTodo.component";
import { ErrorComponent } from "./shared/error.component";
import { DevErrorComponent } from "./shared/deverror.component";
import { GlobalErrorHandler } from "./shared/globalErrorHandler";
import { errorReducer } from "./state/errorReducer";
import { todoReducer } from './state/todoReducer';

@NgModule({
  imports:      [ 
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.provideStore({ todos: todoReducer, errors: errorReducer })
 ],
  declarations: [ AppComponent, TodoListComponent, AddTodoComponent, DevErrorComponent, ErrorComponent ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    TodoService
  ],
  bootstrap:    [ AppComponent, DevErrorComponent ]
})
export class AppModule { }
