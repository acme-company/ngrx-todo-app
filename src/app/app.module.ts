import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent, ItemCountComponent } from './app.component';
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
import { actionReducer } from "./reducers/actionReducer";
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports:      [ 
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    EffectsModule.run(TodoEffects),
    StoreModule.provideStore(
      { 
          todos: todoReducer, 
          errors: errorReducer,
          notifications: notificationReducer,
          actions: actionReducer
      }),
     StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
     })
 ],
  declarations: [ 
    AppComponent, 
    TodoListComponent, 
    AddTodoComponent, 
    DevErrorComponent, 
    ErrorComponent,
    NotificationComponent,
    NotificationListComponent,
    ItemCountComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap:    [ AppComponent, ErrorComponent ]
})
export class AppModule { }
