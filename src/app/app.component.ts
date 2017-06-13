import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "./state/appState";
import { Todo } from "./state/todoReducer";
import * as todosApi from './actions/todos.api';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dialog') dialog:ElementRef;
  todos: Observable<Todo[]>;
  id: number;
  constructor(private store: Store<AppState>) {
    this.todos = store.select('todos');
    this.store.dispatch(new todosApi.LoadTodosAction([]));
    this.todos.subscribe(t=> {
      if (t != null)
        this.id = t.map(x=>x.id).sort().reverse()[0];
    });
    
  }

  openDialog() {
    $('#myModal',this.dialog.nativeElement).modal('show');
  }


  add(todo:Todo) {
    todo.id = this.id + 1;
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
