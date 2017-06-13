import { ActionReducer, Action} from '@ngrx/store';
import * as errors from '../actions/errors';

export interface ErrorInfo {
    name: string;
    message: string;
    stacktrace: string;
    error: Error
}

export interface ErrorState {
    lastError: ErrorInfo;
    errors: ErrorInfo[];
}

let initialState: ErrorState = {
    lastError: null,
    errors: []
}

export function errorReducer(state: ErrorState = initialState, action: Action): ErrorState {
	switch (action.type) {
        case errors.ActionTypes.ADD_ERROR:
            return { 
                lastError: action.payload,
                errors: [...state.errors, action.payload] 
            };

		default:
			return state;
	}
}