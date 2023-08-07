import { Button } from "antd";
import React, {useContext} from "react";
import {HomeContext} from "@/views/home";

const Child: React.FC = () => {
	// console.log(useContext(HomeContext));
	const {countState, countDispatch} = useContext(HomeContext);

	const handleAdd = () => {
		countDispatch({type: "ADD"});
	};
	return(
		<div className="child">
			<div>{countState.count+"_"+countState.age}</div>
			<Button onClick={handleAdd}>按钮ADD</Button>
		</div>
	);
};

export default Child;
