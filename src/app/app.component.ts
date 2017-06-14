import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "./reducers/appState";
import { Todo } from "./reducers/todoReducer";
import * as todosApi from './actions/todos.api';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';
import { NotificationState } from "./reducers/notificationReducer";
import { ErrorState } from "./reducers/errorReducer";
@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dialog') dialog: ElementRef;
  todos: Observable<Todo[]>;
  notifications: Observable<NotificationState>;
  errors: Observable<ErrorState>;

  constructor(public store: Store<AppState>) {
    this.todos = store.select('todos');
    this.notifications = store.select('notifications');
    this.errors = store.select('errors');
  
    
    this.store.dispatch(todosApi.loadTodos([
      // { id: 1, name: 'Groceries' },
      // { id: 2, name: 'Garbage' },
      // { id: 3, name: 'Dishes' }
    ]));

    this.store.debounce(t=>Observable.timer(1000)).withLatestFrom(t=>t).subscribe(t=> {
     console.log({ state: t  });
    });
    
  }

  openDialog() {
    $('#myModal', this.dialog.nativeElement).modal('show');
  }


  add(todo: Todo) {

    this.store.dispatch(todosApi.addTodo(todo.name));
    $('#myModal', this.dialog.nativeElement).modal('hide');
  }

  remove(todo: Todo) {
    this.store.dispatch(todosApi.removeTodo(todo));
  }

  triggerError1() {
    throw new Error("Something Went Wrong!!!");
  }
  triggerError2() {
    throw new Error("Something Really Went Wrong!!!");
  }
}
