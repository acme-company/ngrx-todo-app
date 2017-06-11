import { ActionReducer, Action} from '@ngrx/store';

export class NotificationAction {
    public static ADD_NOTIFICATION: string = "ADD_NOTIFICATION";
    public static DISMISS_NOTIFICATION: string = "DISMISS_NOTIFICATION";
}

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
        case NotificationAction.ADD_NOTIFICATION:
            return { 
                lastNotification: action.payload,
                notifications: [...state.notifications, action.payload] 
            };
        case NotificationAction.DISMISS_NOTIFICATION:
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