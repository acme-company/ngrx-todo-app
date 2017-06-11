import { ErrorHandler } from "@angular/core";
import { Store } from "@ngrx/store";
import { ErrorAction, ErrorInfo } from "../state/errorReducer";
import { AppState } from "../state/appState";

export class GlobalErrorHandler implements ErrorHandler {
    constructor(private store: Store<AppState>) {

    }
    handleError(error: Error) {
        let errorInfo: ErrorInfo = {
            name: error.name,
            message: error.message,
            stacktrace: error.stack,
            error: error
        };

        this.store.dispatch({
            type: ErrorAction.ADD_ERROR,
            payload: errorInfo
        });
    }
}