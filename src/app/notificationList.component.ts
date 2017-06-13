import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "./state/appState";
import { Observable } from "rxjs/Observable";
import { Notification, NotificationCategory, NotificationState } from './reducers/notificationReducer';

@Component({
    selector: 'notification-list',
    templateUrl: './notificationList.component.html'
})
export class NotificationListComponent implements AfterViewInit {
    items: Observable<Notification[]>;
    constructor(private store: Store<AppState>, private elementRef: ElementRef) {
        this.items = store.select<NotificationState>("notifications")
            .map(t => [...t.notifications].reverse());
    }

    ngAfterViewInit() {
        this.items.subscribe(t => {
            $('.collapse.in', this.elementRef.nativeElement).removeClass('in');
        });
    }

    getClass(type: NotificationCategory) {
        return {
            'label-default': type === NotificationCategory.DEFAULT,
            'label-primary': type === NotificationCategory.DEBUG,
            'label-success': type === NotificationCategory.SUCCESS,
            'label-info': type === NotificationCategory.INFO,
            'label-warning': type === NotificationCategory.WARNING,
            'label-danger': type === NotificationCategory.CRITICAL
        };
    }

    getNotificationText(type: NotificationCategory) {
        switch (type) {
            case NotificationCategory.DEFAULT:
                return 'default';
            case NotificationCategory.DEBUG:
                return 'debug';
            case NotificationCategory.SUCCESS:
                return 'success';
            case NotificationCategory.INFO:
                return 'info';
            case NotificationCategory.WARNING:
                return 'warning';
            case NotificationCategory.CRITICAL:
                return 'error';
        }
        return '';
    }
}