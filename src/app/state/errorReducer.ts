import { ActionReducer, Action} from '@ngrx/store';

export class ErrorAction {
    public static ADD_ERROR: string = "ADD_ERROR"
}

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
        case ErrorAction.ADD_ERROR:
            console.log(action.payload);
            return { 
                lastError: action.payload,
                errors: [...state.errors, action.payload] 
            };

		default:
			return state;
	}
}