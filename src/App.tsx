import {Outlet, useLoaderData, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {HoxRoot} from "hox";

const  App: React.FC = () =>     {
	const nav = useNavigate(),
		location = useLocation(),
		loaderData = useLoaderData();

	// console.log("loaderData:",loaderData);
	// 依赖空数组，由于依赖为空，不会变化，只执行一次
	useEffect(() => {
		if(location.pathname === "/"){
			nav("/calendar");
		}
	}, []);

	return(
		<HoxRoot>
			<Outlet></Outlet>
		</HoxRoot>
	);
};

export default App;
