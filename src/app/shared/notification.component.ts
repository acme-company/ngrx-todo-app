import { Component, Inject, Input, ChangeDetectionStrategy, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { NotificationState, Notification } from "../reducers/notificationReducer";
import { AppState } from "../reducers/appState";


@Component({
  selector: 'notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements AfterViewInit {
  lastNotification: Observable<Notification>;
  constructor(private store: Store<AppState>, private elementRef: ElementRef) {
    this.lastNotification = store.select<NotificationState>("notifications").map(t=>t.lastNotification);
  }

  ngAfterViewInit() {
    this.lastNotification.subscribe(t => {
      if (t == null) {
        $('span', this.elementRef.nativeElement).fadeOut(10);
      } else {
        $('span', this.elementRef.nativeElement).fadeIn(200);
        setTimeout(t => {
          $('span', this.elementRef.nativeElement).fadeOut(1000);
        }, 2000);
      }
    });
  }

}
