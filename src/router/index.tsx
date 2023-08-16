import {createBrowserRouter} from "react-router-dom";
import React, {lazy} from "react";


// 获取环境变量配置
// console.log(import.meta.env);
// const { VITE_BASE_URL } = import.meta.env;

// lazy需要在路由上加上Suspense
const App = lazy(() => import("@/App")),
	Home = lazy(() => import("@/views/home")),
	HomeDetail = lazy(() => import("@/views/home/detail")),
	LazyImg = lazy(() => import("@/views/lazyImg")),
	Car = lazy(() => import("@/views/car")),
	Star = lazy(() => import("@/views/star")),
	Olympic = lazy(() => import("@/views/olympic")),
	HouseSty = lazy(() => import("@/views/houseSky")),
	ChinaMap = lazy(() => import("@/views/chinaMap")),
	MagicCube = lazy(() => import("@/views/magicCube")),
	About = lazy(() => import("@/views/about"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: (a) => {
			// console.log(a);
			return "123";
		},
		children:[
			{
				path: "/home",
				element: <Home />
			},
			{
				path: "/detail",
				element: <HomeDetail />
			},
			{
				path: "/about",
				element: <About />
			},
			{
				path: "/lazy-img",
				element: <LazyImg />
			},
			{
				path: "/car",
				element: <Car />
			},
			{
				path: "/star",
				element: <Star />
			},
			{
				path: "/olympic",
				element: <Olympic />
			},
			{
				path: "/house",
				element: <HouseSty />
			},
			{
				path: "/china",
				element: <ChinaMap />
			},
			{
				path: "/cube",
				element: <MagicCube />
			}
		]
	}
]);

export default router;
