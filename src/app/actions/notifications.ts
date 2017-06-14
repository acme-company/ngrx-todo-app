import { Action } from '@ngrx/store';
import { Notification, NotificationCategory } from "../reducers/notificationReducer";
export const ActionTypes =
    {
        ADD_NOTIFICATION: 'ADD_NOTIFICATION',
        DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION'
    };

export class AddNotificationAction implements Action {
    type = ActionTypes.ADD_NOTIFICATION;
    constructor(public payload: Notification) {
    }

}

export class DismissNotificationAction implements Action {
    type = ActionTypes.DISMISS_NOTIFICATION;
    constructor(public payload: Notification) {
    }
}

export function addNotification(title: string, description: string, category: NotificationCategory) {
    return new AddNotificationAction({
        id: 0,
        title: title, 
        description: description,
        category: category,
        dismissed: false, 
        date: new Date()
    });
}

export type Actions = AddNotificationAction | DismissNotificationAction;

