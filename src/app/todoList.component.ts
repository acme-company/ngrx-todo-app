
import { Input, Output, EventEmitter, ChangeDetectionStrategy, Component } from "@angular/core";
import { Todo } from "./state/todoReducer";

@Component({
  selector: 'todoList',
  templateUrl: './todoList.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
   @Input() items: Todo[];
   @Output() itemRemoved: EventEmitter<Todo>;
   changed:number = 0;

   change() {
     ++this.changed;
     return this.changed;
   }

   constructor() {
     this.itemRemoved = new EventEmitter<Todo>();
   }
   remove(item:Todo) {
     this.itemRemoved.next(item);
   }
}