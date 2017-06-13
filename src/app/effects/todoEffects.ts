import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {  Todo } from "../reducers/todoReducer";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';

import * as todosApi from '../actions/todos.api';
import * as todos from '../actions/todos';
import * as notifications from '../actions/notifications';
import * as errors from '../actions/errors';
import {  NotificationCategory } from "../reducers/notificationReducer";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers/appState";

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions,private store: Store<AppState>) {

    }

    getErrorActions(error:Error) {
        return [
            errors.AddErrorAction.create(error),
            notifications.AddNotificationAction.create(
                error.message, error.stack, NotificationCategory.CRITICAL)
        ];
    }

    getNextId(todos:any[]) {
        return todos.length === 0 ? 1 :
            todos.map(t=>t.id).sort().reverse()[0];
    }

    @Effect() addTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_ADD_TODO)
        .withLatestFrom(this.store)
        .map(([action, state]) => { 
            action.payload.id = this.getNextId(state.todos); 
            return action.payload; 
        })
        .mergeMap((todo: Todo) =>
         [
            new todos.AddTodoAction(todo),
            notifications.AddNotificationAction.create(
                `Added todo item ${todo.id}`, todo.name, NotificationCategory.SUCCESS)
        ])  
        .catch(error => Observable.from(this.getErrorActions(error)));

    @Effect() removeTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_REMOVE_TODO)
        .map(action => action.payload)
        .mergeMap((todo: Todo) =>
         [
            new todos.RemoveTodoAction(todo),
            notifications.AddNotificationAction.create(
                `Removed todo item ${todo.id}`, todo.name, NotificationCategory.INFO)
        ])      
        .catch(error => Observable.from(this.getErrorActions(error)));


    @Effect() loadTodos$ = this.actions$
        .ofType(todosApi.ActionTypes.API_LOAD_TODOS)
        .withLatestFrom(this.store)
        .mergeMap(([action, state]) => 
         [
            new todos.AddTodosAction([
                { id: 1, name: 'Groceries'},
                { id: 2, name: 'Garbage'},
                { id: 3, name: 'Dishes'}
            ]),
            notifications.AddNotificationAction.create(
                `Loaded 3 items`, 'Initial Load', NotificationCategory.INFO)
        ])      
        .catch(error => Observable.from(this.getErrorActions(error)));
}
