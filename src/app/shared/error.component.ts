import { Component, Inject, Input, ChangeDetectionStrategy, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ErrorState, ErrorInfo } from "../state/errorReducer";
import { AppState } from "../state/appState";
import 'rxjs/add/operator/map';

@Component({
  selector: 'error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements AfterViewInit { 
  @ViewChild('dialog') dialog:ElementRef;
  lastError: Observable<ErrorInfo>;
  constructor (private store: Store<AppState>) { 
      this.lastError = store.select<ErrorState>("errors").map(t=>t.lastError);
  }
 
  ngAfterViewInit() {
      $(this.dialog.nativeElement).modal({
        backdrop: 'static',
        show: false,
        keyboard: false
      });

      this.lastError.subscribe(t=> {
        if (t != null) {
          this.openDialog();
        }
      });

  }

  openDialog() {
    $(this.dialog.nativeElement).modal('show');
  }

  onDismiss() {
  }
  onRefresh() {
     window.location.href =  window.location.href;
  }

}
