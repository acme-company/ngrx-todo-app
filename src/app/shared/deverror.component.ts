import { Component, Inject, Input, ChangeDetectionStrategy, EventEmitter, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ErrorState, ErrorInfo } from "../reducers/errorReducer";
import { AppState } from "../reducers/appState";
import 'rxjs/add/operator/map';

@Component({
  selector: 'error',
  templateUrl: './deverror.component.html'
})
export class DevErrorComponent implements AfterViewInit { 
  @ViewChild('dialog') dialog:ElementRef;
  lastError: Observable<ErrorInfo>;
  constructor (private store: Store<AppState>) { 
      this.lastError = store.select<ErrorState>("errors").map(t=>t.lastError);
      this.lastError.subscribe(t=> {
        if (t != null) {
          this.openDialog();
        }
      });
  }
 
  ngAfterViewInit() {
      $(this.dialog.nativeElement).modal({
        backdrop: 'static',
        show: false,
        keyboard: false
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
