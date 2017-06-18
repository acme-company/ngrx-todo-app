import { ErrorHandler } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { ErrorInfo } from "../reducers/errorReducer";
import { AppState } from "../reducers/appState";
import { NotificationCategory } from "../reducers/notificationReducer";
import * as errors from '../actions/errors';
import * as notifications from '../actions/notifications';
import * as actions from '../actions/actions';


function errorActions(error: Error) {
        console.log(error);
    return [
        errors.to.add(error),
        notifications.to.add('An error occurred', error.stack.replace(/\n/g, '<br />'), NotificationCategory.CRITICAL)
    ];
}

function logActions(actionList:Action[]) {
    return [...actionList].reverse().map(t=> actions.to.add(t, 'reducer'));
}

export class GlobalErrorHandler implements ErrorHandler {
    constructor(private store: Store<AppState>) {

    }


    handleError(error: Error) {
        let e = errorActions(error);
        let a = logActions(e);
        [...e, ...a].map(t=> this.store.dispatch(t));
        
    }
}