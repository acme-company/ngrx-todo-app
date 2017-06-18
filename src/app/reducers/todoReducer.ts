import { ActionReducer, Action} from '@ngrx/store';
import * as todo from '../actions/todos';


export interface Todo {
    id: number;
    name: string;
}


export function todoReducer(todos: Todo[]=[], action: Action): Todo[] {
    // if (todo.ActionTypes.hasOwnProperty(action.type)) {
    //     console.log(action);
    // }
    
	switch (action.type) {
        case todo.ActionTypes.ADD_TODO:
            return   [...todos, action.payload];
        case todo.ActionTypes.ADD_TODOS:
            return todos.concat(action.payload);
        case todo.ActionTypes.REMOVE_TODO:
            return todos.filter(t=>t.id !== action.payload.id);
		default:
			return todos;
	}
}