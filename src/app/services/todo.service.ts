import { Store } from "@ngrx/store";
import { TodoAction, Todo } from "../state/todoReducer";
import { AppState } from "../state/appState";
import { NotificationService } from "./notification.service";
import { NotificationCategory } from "../state/notificationReducer";

export class TodoService {
    id:number;
    constructor (private store:Store<AppState>, private notificationService: NotificationService) {
        
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

        this.notificationService.addNotification(`Added todo item ${this.id}`, "", NotificationCategory.SUCCESS);
    }

    removeTodo(todo:Todo) {
        this.store.dispatch({
            type: TodoAction.REMOVE_TODO,
            payload: todo
        });
        this.notificationService.addNotification(`Removed todo item ${todo.id}`, "", NotificationCategory.INFO);
    }
}