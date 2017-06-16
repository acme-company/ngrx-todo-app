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

export class to {
    public static add = (name:string) => new AddTodoAction({ id: 0, name: name});
    public static addAll = (todos: Todo[]) => new AddTodosAction(todos);
    public static remove = (todo:Todo) => new RemoveTodoAction(todo);

}


export type Actions = 
    AddTodoAction | RemoveTodoAction;
