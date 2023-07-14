import {createBrowserRouter} from "react-router-dom";
import React, {lazy} from "react";


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
			}
		]
	}
]);

export default router;
