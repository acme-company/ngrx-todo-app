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
import { notificationReducer } from "./state/notificationReducer";
import { NotificationComponent } from "./shared/notification.component";
import { NotificationService } from "./services/notification.service";

@NgModule({
  imports:      [ 
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.provideStore(
      { 
          todos: todoReducer, 
          errors: errorReducer,
          notifications: notificationReducer
      })
 ],
  declarations: [ 
    AppComponent, 
    TodoListComponent, 
    AddTodoComponent, 
    DevErrorComponent, 
    ErrorComponent,
    NotificationComponent 
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    TodoService,
    NotificationService
  ],
  bootstrap:    [ AppComponent, DevErrorComponent ]
})
export class AppModule { }
