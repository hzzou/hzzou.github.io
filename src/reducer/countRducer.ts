import {useReducer} from "react";

export interface countState{
	count: number;
	age?: number;
}

export interface countAction{
	type: "ADD" | "SUB" | "RESET"
	payload?: number
}

export const countReducer = (state: countState, action: countAction) => {
	console.log("action:", action);
	switch (action.type) {
	case "ADD":
		return {
			count: state.count + 1,
			age: state.age
		};
	case "SUB":
		return {
			count: state.count > 0 ? state.count - 1 : 0,
			age: state.age
		};
	case "RESET":
		return {
			count: action.payload ? action.payload : 0,
			age: state.age
		};
	}
};

export const useCount = (): [countState, any] => {
	const [state, dispatch] = useReducer(countReducer, {count: 0, age: 25});
	const countState = state, countDispatch = dispatch;

	return [countState, countDispatch];
};


