import { Todo } from "./todoReducer";
import { ErrorState } from "./errorReducer";

export interface AppState {
    todos: Todo[],
    errors: ErrorState
}