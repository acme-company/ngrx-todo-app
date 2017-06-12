import { ErrorHandler } from "@angular/core";
import { Store } from "@ngrx/store";
import { ErrorAction, ErrorInfo } from "../state/errorReducer";
import { AppState } from "../state/appState";
import { NotificationService } from "../services/notification.service";
import { NotificationCategory } from "../state/notificationReducer";

export class GlobalErrorHandler implements ErrorHandler {
    constructor(private store: Store<AppState>, private notificationService: NotificationService) {

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
        this.notificationService.addNotification(`An error occurred`, errorInfo.stacktrace.replace('\n','<br />'), NotificationCategory.CRITICAL);
        
    }
}