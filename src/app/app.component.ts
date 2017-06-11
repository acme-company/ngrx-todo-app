import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { TodoService } from "./services/todo.service";
import { AppState } from "./state/appState";
import { Todo, TodoAction } from "./state/todoReducer";

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dialog') dialog:ElementRef;
  todos: Observable<Todo[]>;
  constructor(private store: Store<AppState>, private todoService:TodoService) {
    this.todos = store.select('todos');
    this.todoService.load();
    
  }

  openDialog() {
    $('#myModal',this.dialog.nativeElement).modal('show');
  }


  add(todo:Todo) {
    this.todoService.addTodo(todo.name);
     $('#myModal',this.dialog.nativeElement).modal('hide');
  }

  remove(todo:Todo) {
    this.todoService.removeTodo(todo);
  }

  triggerError1() {
    throw new Error("Something Went Wrong!!!");
  }
  triggerError2() {
    throw new Error("Something Really Went Wrong!!!");
  }
}
