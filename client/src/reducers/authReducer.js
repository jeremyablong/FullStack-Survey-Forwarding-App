import { FETCH_USER } from "../actions/types.js";

const INITIAL_STATE = {

}

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			// statements_def
			return state;
	}
}