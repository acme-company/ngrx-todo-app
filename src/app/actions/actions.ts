import { Action } from '@ngrx/store';
export const ActionTypes =
    {
        ADD_ACTION: 'ADD_ACTION'
    };

export class AddAction implements Action { 
    type = ActionTypes.ADD_ACTION; 
    constructor(public payload:[Action, string]) { 
    } 
}
 

export const add = (action:Action, reducer:string) => new AddAction([action, reducer]);

export type Actions = AddAction;