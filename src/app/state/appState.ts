import { Todo } from "./todoReducer";
import { ErrorState } from "./errorReducer";
import { NotificationState } from "./notificationReducer";

export interface AppState {
    todos: Todo[],
    errors: ErrorState,
    notifications: NotificationState
}