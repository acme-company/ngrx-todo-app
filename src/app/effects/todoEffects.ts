import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Todo } from "../reducers/todoReducer";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
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

function errorActions(error: Error) {
    return [
        errors.add(error),
        notifications.addNotification('An error occurred', error.stack, NotificationCategory.CRITICAL)
    ];
}

function addTodoActions(todo: Todo) {
    return [
        todos.add(todo.name),
        notifications.addNotification(`Added todo item ${todo.id}`, todo.name, NotificationCategory.SUCCESS)
    ];
}

function removeTodoActions(todo:Todo) {
    return [
        todos.remove(todo),
        notifications.addNotification(`Removed todo item ${todo.id}`, todo.name, NotificationCategory.INFO)
    ];
}

function loadTodoActions(todoList: Todo[]) {
    return [
        todos.addAll(todoList),
        notifications.addNotification(`Loaded ${todoList.length} items`, 'Initial Load', NotificationCategory.INFO)
    ];
}


function logActions(actionList:Action[]) {
    return [...actionList].reverse().map(t=> actions.add(t, 'reducer'));
}


@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions, private store: Store<AppState>) {

    }


    getNextId(todos: any[]) {
        return todos.length === 0 ? 1 :
            todos.map(t => t.id).sort().reverse()[0] + 1;
    }

    @Effect() addTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_ADD_TODO)
        .withLatestFrom(this.store)
        .do(([action, state]) => {action.payload.id = this.getNextId(state.todos)})
        .map(([action, state]) => action.payload)
        .map((todo: Todo) => addTodoActions(todo))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));

    @Effect() removeTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_REMOVE_TODO)
        .map(action => action.payload)
        .map((todo: Todo) => removeTodoActions(todo))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));

    @Effect() loadTodos$ = this.actions$
        .ofType(todosApi.ActionTypes.API_LOAD_TODOS)
        .withLatestFrom(this.store)
        .map(([action, state]) => loadTodoActions(action.payload))
        .concatMap((actionList:Action[])=> actionList.concat(logActions(actionList)))
        .catch(error => Observable.from(errorActions(error)));
}
