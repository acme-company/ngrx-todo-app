import { Action } from '@ngrx/store';
import { ErrorInfo } from "../reducers/errorReducer";
export const ActionTypes =
    {
        ADD_ERROR: 'ADD_ERROR'
    };

export class AddErrorAction implements Action { 
    type = ActionTypes.ADD_ERROR; 
    constructor(public payload:ErrorInfo) { 
    } 
} 

export function addError(error:Error) {
    return new AddErrorAction({
        name: error.name, 
        message: error.message,
        stacktrace: error.stack,
        error: null
    });
}

export const add = (error:Error) => new AddErrorAction({
        name: error.name, 
        message: error.message,
        stacktrace: error.stack,
        error: null
    });


export type Actions = AddErrorAction;
