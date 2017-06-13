import { ErrorHandler } from "@angular/core";
import { Store } from "@ngrx/store";
import { ErrorInfo } from "../state/errorReducer";
import { AppState } from "../state/appState";
import { NotificationCategory } from "../state/notificationReducer";
import * as errors from '../actions/errors';
import * as notifications from '../actions/notifications';


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

        this.store.dispatch(new errors.AddErrorAction(errorInfo));

        this.store.dispatch(new notifications.AddNotificationAction({
            id: 0,
            title: 'An error occurred',
            description: errorInfo.stacktrace.replace('\n','<br />'),
            category: NotificationCategory.CRITICAL,
            dismissed: false,
            date: new Date()
        }));

        
    }
}