import { Action } from '@ngrx/store';
import { Notification } from "../state/notificationReducer";
export const ActionTypes =
    {
        ADD_NOTIFICATION: 'ADD_NOTIFICATION',
        DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION'
    };

export class AddNotificationAction implements Action { 
    type = ActionTypes.ADD_NOTIFICATION; 
    constructor(public payload:Notification) { 
    } 
} 

export class DismissNotificationAction implements Action { 
    type = ActionTypes.DISMISS_NOTIFICATION; 
    constructor(public payload:Notification) { 
    } 
} 
export type Actions = AddNotificationAction | DismissNotificationAction;
