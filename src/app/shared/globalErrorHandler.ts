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
        [
            errors.addError(error),
            notifications.addNotification(
                'An error occurred',
                error.stack.replace('\n','<br />'),
                NotificationCategory.CRITICAL)   
        ].forEach(t=> this.store.dispatch(t));

        [
            actions.addAction(notifications.addNotification(
                'An error occurred',
                error.stack.replace('\n','<br />'),
                NotificationCategory.CRITICAL), 'reducer'),
            actions.addAction(errors.addError(error),'reducer') 
        ].forEach(t=> this.store.dispatch(t));
        
    }
}