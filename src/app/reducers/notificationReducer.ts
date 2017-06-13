import { ActionReducer, Action} from '@ngrx/store';
import * as notifications from '../actions/notifications';

export enum NotificationCategory {
    DEFAULT = 0, // default
    DEBUG = 1,  // primary
    SUCCESS = 2, // success
    INFO = 3,   // info
    WARNING = 4,  //warning 
    CRITICAL = 5  //danger
}

export interface Notification {
    id: number;
    title: string;
    description: string;
    date: Date;
    dismissed: boolean;
    category: NotificationCategory;
}

export interface NotificationState {
    lastNotification: Notification;
    notifications: Notification[];
}

let initialState: NotificationState = {
    lastNotification: null,
    notifications: []
};

export function notificationReducer(state: NotificationState = initialState, action: Action): NotificationState {

    
	switch (action.type) {
        case notifications.ActionTypes.ADD_NOTIFICATION:
            action.payload.id = state.notifications.length === 0 ? 
                1 : state.notifications.map(t=>t.id).sort().reverse()[0] + 1;
            return { 
                lastNotification: action.payload,
                notifications: [...state.notifications, action.payload] 
            };
        case notifications.ActionTypes.DISMISS_NOTIFICATION:
            let notification = state.notifications.find(t=>t.id === action.payload.id);
            if (notification != null)
                notification[0].dismissed = true;

            return {
                lastNotification: Object.assign({}, state.lastNotification),
                notifications: [...state.notifications]
            };

		default:
			return state;
	}
}