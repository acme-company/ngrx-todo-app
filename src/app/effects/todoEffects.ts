import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Todo } from "../reducers/todoReducer";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';

import * as todos from '../actions/todos';
import * as notifications from '../actions/notifications';
import * as todosApi from '../actions/todos.api';
import * as errors from '../actions/errors';
import * as actions from '../actions/actions';
import { NotificationCategory } from "../reducers/notificationReducer";
import { Store, Action } from "@ngrx/store";
import { AppState } from "../reducers/appState";
import { Http } from "@angular/http";

function errorActions(error: Error) {
    return [
        errors.to.add(error),
        notifications.to.add('An error occurred', error.stack, NotificationCategory.CRITICAL)
    ];
}

function addTodoActions(todo: Todo) {
    return [
        todos.to.add(todo),
        notifications.to.add(`Added todo item ${todo.id}`, todo.name, NotificationCategory.SUCCESS)
    ];
}

function removeTodoActions(todo:Todo) {
    return [
        todos.to.remove(todo),
        notifications.to.add(`Removed todo item ${todo.id}`, todo.name, NotificationCategory.INFO)
    ];
}

function loadTodoActions(todoList: Todo[]) {
    TodoEffects.id = todoList.map(t=>t.id).sort((a,b)=>b-a)[0];
    return [
        todos.to.addAll(todoList),
        notifications.to.add(`Loaded ${todoList.length} items`, 'Initial Load', NotificationCategory.INFO)
    ];
}


function logActions(actionList:Action[]) {
    return [...actionList].reverse().map(t=> actions.to.add(t, 'reducer'));
}


@Injectable()
export class TodoEffects {
    static id: number = 0;
    constructor(private actions$: Actions, private store: Store<AppState>, private http: Http) {

    }

    @Effect() addTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_ADD_TODO)
        .withLatestFrom(this.store)
        .do(([action, state]) => {action.payload.id = ++TodoEffects.id})
        .map(([action, state]) => action.payload as Todo)
        .concatMap(t=> this.http.post('http://localhost:3000/todos', t).map(t=>t.json() as Todo))
        .map((todo: Todo) => addTodoActions(todo))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));

    @Effect() removeTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_REMOVE_TODO)
        .map(action => action.payload)
        .mergeMap(x=> this.http.delete('http://localhost:3000/todos/' + x.id).map(t=>x))        
        .map((todo: Todo) => removeTodoActions(todo))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));

    @Effect() loadTodos$ = this.actions$
        .ofType(todosApi.ActionTypes.API_LOAD_TODOS)
        .map(action => action.payload)
        .mergeMap(t=> this.http.get('http://localhost:3000/todos').map(t=>t.json() as Todo[]))
        .map((todo:Todo[])=> loadTodoActions(todo))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));
}
