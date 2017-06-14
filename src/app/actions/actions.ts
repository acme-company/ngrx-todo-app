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
 

export function addAction(action:Action, reducer:string) {
    return new AddAction([action, reducer]);
}

export type Actions = AddAction;