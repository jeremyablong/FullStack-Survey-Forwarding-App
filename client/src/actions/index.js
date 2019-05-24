import axios from "axios";
import { FETCH_USER } from "./types.js";

export const fetchUser = () => {
	return function (dispatch) {
		axios.get("/api/currentUser")
			.then((res) => {
				dispatch({ type: "FETCH_USER", payload: res.data });
			});
	}
}

export const handleToken = (token) => async dispatch => {
	const res = await axios.post("/api/stripe", token);

	dispatch({ type: "FETCH_USER", payload: res.data});
}	