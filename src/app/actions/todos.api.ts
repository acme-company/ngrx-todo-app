import { Action } from '@ngrx/store';
import { Todo } from "../reducers/todoReducer";
export const ActionTypes =
    {
        API_ADD_TODO: 'API_ADD_TODO',
        API_LOAD_TODOS: 'API_LOAD_TODOS',
        API_REMOVE_TODO: 'API_REMOVE_TODO'
    };

export class AddTodoAction implements Action { 
    type = ActionTypes.API_ADD_TODO; 
    constructor(public payload:Todo) { 
    } 
} 

export class LoadTodosAction implements Action { 
    type = ActionTypes.API_LOAD_TODOS; 
    constructor(public payload:Todo[]) { 
    } 
} 


export class RemoveTodoAction implements Action { 
    type = ActionTypes.API_REMOVE_TODO; 
    constructor(public payload:Todo) {

     } 
}

export function addTodo(name: string) {
    return new AddTodoAction({ id: 0, name: name});
}

export function removeTodo(todo:Todo) {
    return new RemoveTodoAction(todo);
}

export function loadTodos(todos:Todo[]) {
    return new LoadTodosAction(todos);
}


export type Actions = 
    AddTodoAction  | 
    LoadTodosAction |
    RemoveTodoAction ;
