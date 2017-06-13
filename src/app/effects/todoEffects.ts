import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {  Todo } from "../state/todoReducer";

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
import {  NotificationCategory } from "../state/notificationReducer";
import { Store } from "@ngrx/store";
import { AppState } from "../state/appState";

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions,private store: Store<AppState>) {

    }

    getErrorActions(error:Error) {
        return [
            new errors.AddErrorAction({
                name: error.name,
                message: error.message,
                stacktrace: error.stack,
                error: error}),
            new notifications.AddNotificationAction({
                id: 0,
                title: error.message,
                description: error.stack,
                category: NotificationCategory.CRITICAL,
                dismissed: false,
                date: new Date()})
        ];
    }

    getNotificationAction(title: string, description:string, category:NotificationCategory) {
        return new notifications.AddNotificationAction({
                id: 0,
                title:title,
                description: description,
                category: category,
                dismissed: false,
                date: new Date()
            });
        
    }

    getNextId(todos:any[]) {
        return todos.length === 0 ? 1 :
            todos.map(t=>t.id).sort().reverse()[0];
    }

    @Effect() addTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_ADD_TODO)
        .withLatestFrom(this.store)
        .map(([action, state]) => { action.payload.id = this.getNextId(state.todos); return action.payload; })
        .mergeMap((todo: Todo) =>
         [
            new todos.AddTodoAction(todo),
            this.getNotificationAction(
                `Added todo item ${todo.id}`,
                todo.name,
                NotificationCategory.SUCCESS,
            )
            
        ])  
        .catch(error => Observable.from(this.getErrorActions(error)));

    @Effect() removeTodo$ = this.actions$
        .ofType(todosApi.ActionTypes.API_REMOVE_TODO)
        .map(action => action.payload)
        .mergeMap((todo: Todo) =>
         [
            new todos.RemoveTodoAction(todo),
            this.getNotificationAction(
                `Removed todo item ${todo.id}`,
                todo.name,
                NotificationCategory.INFO
            )
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
            this.getNotificationAction(
                `Loaded 3 items`,
                'Initial Load',
                NotificationCategory.INFO
            )            
        ])      
        .catch(error => Observable.from(this.getErrorActions(error)));
}
