import { Store } from "@ngrx/store";
import { TodoAction, Todo } from "../state/todoReducer";
import { AppState } from "../state/appState";

export class TodoService {
    id:number;
    constructor (private store:Store<AppState>) {
        
    }

    load() {
        let items = [
            { id: 1, name: 'Groceries'},
            { id: 2, name: 'Garbage'},
            { id: 3, name: 'Dishes'}
        ];
        this.id = 3;

        this.store.dispatch({ 
            type: TodoAction.ADD_TODOS,
            payload: items
        });
    }

    addTodo(name:string) {
        let todo:Todo = {
            id: ++this.id,
            name: name
        };

        this.store.dispatch({
            type: TodoAction.ADD_TODO,
            payload: todo
        });
    }

    removeTodo(todo:Todo) {
        this.store.dispatch({
            type: TodoAction.REMOVE_TODO,
            payload: todo
        });
    }
}