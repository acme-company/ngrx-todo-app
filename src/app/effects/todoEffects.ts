import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {  Todo } from "../reducers/todoReducer";

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
import {  NotificationCategory } from "../reducers/notificationReducer";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers/appState";

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions,private store: Store<AppState>) {

    }

    getErrorActions(error:Error) {
        
        return [
            errors.addError(error),
            notifications.addNotification(
                error.message, error.stack, NotificationCategory.CRITICAL)
        ];
    }

    getNextId(todos:any[]) {
        return todos.length === 0 ? 1 :
            todos.map(t=>t.id).sort().reverse()[0];
    }

    @Effect() addTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_ADD_TODO)
        .do(t=> { 
            console.log(t);
        })
        .withLatestFrom(this.store)
        .map(([action, state]) => { 
            action.payload.id = this.getNextId(state.todos); 
            return action.payload; 
        })
        .mergeMap((todo: Todo) =>
         [
            todos.addTodo(todo.name),
            notifications.addNotification(
                `Added todo item ${todo.id}`, todo.name, NotificationCategory.SUCCESS)
        ])  
        .catch(error => Observable.from(this.getErrorActions(error)));

    @Effect() removeTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_REMOVE_TODO)
        .do(t=> { 
            console.log(t);
        })
        .map(action => action.payload)
        .mergeMap((todo: Todo) =>
         [
            todos.removeTodo(todo),
            notifications.addNotification(
                `Removed todo item ${todo.id}`, todo.name, NotificationCategory.INFO)
        ])      
        .catch(error => Observable.from(this.getErrorActions(error)));


    @Effect() loadTodos$ = this.actions$
        .ofType(todosApi.ActionTypes.API_LOAD_TODOS)
        .do(t=> { 
            console.log(t);
        })
        .withLatestFrom(this.store)
        .mergeMap(([action, state]) => 
         [
            todos.addTodos(action.payload),
            notifications.addNotification(
                `Loaded ${action.payload.length} items`, 'Initial Load', NotificationCategory.INFO)
        ])      
        .catch(error => Observable.from(this.getErrorActions(error)));
}
