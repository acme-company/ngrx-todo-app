import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Todo } from "./reducers/todoReducer";



@Component({
    selector: 'add-todo',
    templateUrl: './addTodo.component.html'
})
export class AddTodoComponent implements OnInit {
    formGroup: FormGroup;
    @Output() onAdd: EventEmitter<Todo>;

    constructor(private fb:FormBuilder) {
        this.onAdd = new EventEmitter<Todo>();
        this.formGroup = fb.group({
            'name': ['']
        });
     }

    ngOnInit() { }

    onSave() {
        
        this.onAdd.next(this.formGroup.value);
        this.formGroup = this.fb.group({
            'name': ['']
        });

    }

    onDismiss() {
        this.formGroup = this.fb.group({
            'name': ['']
        });        
    }
}