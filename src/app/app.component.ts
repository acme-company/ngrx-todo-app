import { Component, ViewChild, ElementRef, OnChanges, SimpleChanges, Input, AfterViewInit, OnInit } from '@angular/core';
import { Store, Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from "./reducers/appState";
import { Todo } from "./reducers/todoReducer";
import * as todosApi from './actions/todos.api';
import * as actions from './actions/actions';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';
import { NotificationState } from "./reducers/notificationReducer";
import { ErrorState } from "./reducers/errorReducer";

@Component({
  selector: 'item-count',
  template: `
    <span class="badge pull-right">{{itemCount | async}} items</span>
  `
})
export class ItemCountComponent  {
  itemCount: Observable<number>;
  constructor(public store: Store<AppState>, private elementRef:ElementRef) {
    var path = this.elementRef.nativeElement.getAttribute('path');
    var i = path.indexOf('.');
    var state = path.substring(0, i);
    var statePath = path.substring(i);
    this.itemCount = this.store.select<Todo[]>(state).map(eval('t=>t' + statePath));
  }
}


@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dialog') dialog: ElementRef;
  todos: Observable<Todo[]>;
  notifications: Observable<NotificationState>;
  errors: Observable<ErrorState>;
  actions: Observable<Action[]>;

  constructor(public store: Store<AppState>) {
    this.todos = store.select('todos');
    this.notifications = store.select('notifications');
    this.errors = store.select('errors');
    this.actions = store.select<Action[]>('actions').map(t=> t); // [...t].reverse());
    
    this.store.dispatch(todosApi.to.load([
      // { id: 1, name: 'Groceries' },
      // { id: 2, name: 'Garbage' },
      // { id: 3, name: 'Dishes' }
    ]));

    this.store.dispatch(actions.to.add(todosApi.to.load([]),'effects'));

    // this.store.debounce(t=>Observable.timer(1000)).withLatestFrom(t=>t).subscribe(t=> {
    //  console.log({ state: t  });
    // });
    
  }

  openDialog() {
    $('#myModal', this.dialog.nativeElement).modal('show');
  }


  add(todo: Todo) {

    this.store.dispatch(todosApi.to.add(todo.name));
    this.store.dispatch(actions.to.add(todosApi.to.add(todo.name), 'effects'));
    $('#myModal', this.dialog.nativeElement).modal('hide');
  }

  remove(todo: Todo) {
    this.store.dispatch(todosApi.to.remove(todo));
    this.store.dispatch(actions.to.add(todosApi.to.remove(todo),'effects'));
  }

  triggerError1() {
    throw new Error("Something Went Wrong!!!");
  }
  triggerError2() {
    throw new Error("Something Really Went Wrong!!!");
  }
}
