
import {createGlobalStore} from "hox";
import {useCount} from "@/reducer/countRducer";

export const [useGlobalStore] = createGlobalStore(() => {
	const [countState, countDispatch] = useCount();

	return{
		countState,
		countDispatch
	};
});
