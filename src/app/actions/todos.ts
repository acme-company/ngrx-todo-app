import { Action } from '@ngrx/store';
import { Todo } from "../reducers/todoReducer";
export const ActionTypes =
    {
        ADD_TODO: 'ADD_TODO',
        ADD_TODOS: 'ADD_TODOS',
        REMOVE_TODO: 'REMOVE_TODO'
    };

export class AddTodoAction implements Action { 
    type = ActionTypes.ADD_TODO; 
    constructor(public payload:Todo) { 
    } 
}

export class AddTodosAction implements Action { 
    type = ActionTypes.ADD_TODOS; 
    constructor(public payload:Todo[]) { 
    } 
} 
 

export class RemoveTodoAction implements Action { 
    type = ActionTypes.REMOVE_TODO; 
    constructor(public payload:Todo) {

     } 
}

export const add = (name:string) => new AddTodoAction({ id: 0, name: name});
export const addAll = (todos: Todo[]) => new AddTodosAction(todos);
export const remove = (todo:Todo) => new RemoveTodoAction(todo);

export type Actions = 
    AddTodoAction | RemoveTodoAction;
