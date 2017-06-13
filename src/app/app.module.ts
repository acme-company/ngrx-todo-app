import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodoListComponent } from "./todoList.component";
import { AddTodoComponent } from "./addTodo.component";
import { ErrorComponent } from "./shared/error.component";
import { DevErrorComponent } from "./shared/deverror.component";
import { GlobalErrorHandler } from "./shared/globalErrorHandler";
import { errorReducer } from "./reducers/errorReducer";
import { todoReducer } from './reducers/todoReducer';
import { notificationReducer } from "./reducers/notificationReducer";
import { NotificationComponent } from "./shared/notification.component";
import { NotificationListComponent } from "./notificationList.component";
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './effects/todoEffects';

@NgModule({
  imports:      [ 
    BrowserModule,
    ReactiveFormsModule,
    EffectsModule.run(TodoEffects),
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
    NotificationComponent,
    NotificationListComponent 
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap:    [ AppComponent, ErrorComponent ]
})
export class AppModule { }
