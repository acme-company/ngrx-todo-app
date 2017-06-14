import { Todo } from "./todoReducer";
import { ErrorState } from "./errorReducer";
import { NotificationState } from "./notificationReducer";
import { Action } from "@ngrx/store";

export interface AppState {
    todos: Todo[],
    errors: ErrorState,
    notifications: NotificationState,
    actions: Action[]
}