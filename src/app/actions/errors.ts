import { Action } from '@ngrx/store';
import { ErrorInfo } from "../state/errorReducer";
export const ActionTypes =
    {
        ADD_ERROR: 'ADD_ERROR'
    };

export class AddErrorAction implements Action { 
    type = ActionTypes.ADD_ERROR; 
    constructor(public payload:ErrorInfo) { 
    } 
} 


export type Actions = AddErrorAction;
