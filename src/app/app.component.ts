import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "./reducers/appState";
import { Todo } from "./reducers/todoReducer";
import * as todosApi from './actions/todos.api';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dialog') dialog:ElementRef;
  todos: Observable<Todo[]>;

  constructor(private store: Store<AppState>) {
    this.todos = store.select('todos');
    this.store.dispatch(new todosApi.LoadTodosAction([]));

    
  }

  openDialog() {
    $('#myModal',this.dialog.nativeElement).modal('show');
  }


  add(todo:Todo) {

    this.store.dispatch(new todosApi.AddTodoAction(todo));
     $('#myModal',this.dialog.nativeElement).modal('hide');
  }

  remove(todo:Todo) {
    this.store.dispatch(new todosApi.RemoveTodoAction(todo));
  }

  triggerError1() {
    throw new Error("Something Went Wrong!!!");
  }
  triggerError2() {
    throw new Error("Something Really Went Wrong!!!");
  }
}
