import { ErrorHandler } from "@angular/core";
import { Store } from "@ngrx/store";
import { ErrorInfo } from "../reducers/errorReducer";
import { AppState } from "../reducers/appState";
import { NotificationCategory } from "../reducers/notificationReducer";
import * as errors from '../actions/errors';
import * as notifications from '../actions/notifications';
import * as actions from '../actions/actions';


export class GlobalErrorHandler implements ErrorHandler {
    constructor(private store: Store<AppState>) {

    }
    handleError(error: Error) {
        
        this.store.dispatch(errors.addError(error));
        this.store.dispatch(notifications.addNotification(
            'An error occurred',
            error.stack.replace('\n','<br />'),
            NotificationCategory.CRITICAL));

        this.store.dispatch(actions.addAction(notifications.addNotification(
            'An error occurred',
            error.stack.replace('\n','<br />'),
            NotificationCategory.CRITICAL), 'reducer'));

        this.store.dispatch(actions.addAction(errors.addError(error),'reducer'));
        
    }
}