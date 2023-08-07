import{useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {Button} from "antd";
import {useGlobalStore} from "@/reducer/globalStore";
const HomeDetail: React.FC = () => {
	const nav = useNavigate();
	// console.log("ue:", useGlobalStore());
	const {countState, countDispatch} = useGlobalStore();
	// console.log("c:", countState);
	const back = () => {
		nav("/home");
	};

	const handleSubCount = () => {
		countDispatch({type: "SUB"});
	};

	return(
		<div className='home-detail'>
			<div>{countState.count}</div>
			<Button onClick={handleSubCount}>reducer共享</Button>
			<div>homeDetail</div>
			<div onClick={back}>返回</div>
		</div>
	);
};

export default HomeDetail;
