import { ActionReducer, Action} from '@ngrx/store';
import * as act from '../actions/actions';


export function actionReducer(actions: Action[]=[], action: Action): Action[] {
    if (act.ActionTypes.hasOwnProperty(action.type)) {
        console.log(action);
    }
    
	switch (action.type) {
        case act.ActionTypes.ADD_ACTION:
            return   [action.payload, ...actions];
		default:
			return actions;
	}
}