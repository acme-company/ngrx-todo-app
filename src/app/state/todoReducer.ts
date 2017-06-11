import { ActionReducer, Action} from '@ngrx/store';

export class TodoAction {
    public static ADD_TODOS: string = "ADD_TODOS"
    public static ADD_TODO: string = "ADD_TODO";
    public static REMOVE_TODO: string = "REMOVE_TODO";
}

export interface Todo {
    id: number;
    name: string;
}


export function todoReducer(todos: Todo[]=[], action: Action): Todo[] {
	switch (action.type) {
        case TodoAction.ADD_TODO:
            return [...todos, action.payload];
        case TodoAction.ADD_TODOS:
            return todos.concat(action.payload);
        case TodoAction.REMOVE_TODO:
            return todos.filter(t=>t.id !== action.payload.id);
		default:
			return todos;
	}
}