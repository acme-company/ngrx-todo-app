import { Store } from "@ngrx/store";
import { NotificationAction, Notification, NotificationCategory } from "../state/notificationReducer";
import { AppState } from "../state/appState";

export class NotificationService {
    id: number;
    constructor (private store:Store<AppState>) {
        this.id = 0;
    }

    addNotification(title:string, description:string, category:NotificationCategory) {
        let notification:Notification = {
            id: ++this.id,
            title: title,
            description: description,
            category: category,
            dismissed: false,
            date: new Date()
        };

        this.store.dispatch({
            type: NotificationAction.ADD_NOTIFICATION,
            payload: notification
        });
    }

    dismissNotification(notification:Notification) {
        this.store.dispatch({
            type: NotificationAction.DISMISS_NOTIFICATION,
            payload: notification
        });
    }
}