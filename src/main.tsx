import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import "antd/es/style";


ReactDOM.createRoot(document.getElementById("root")!).render(
	//<React.StrictMode>
		<Suspense>
      <RouterProvider router={router} fallbackElement={"loading..."}></RouterProvider>
		</Suspense>
	//</React.StrictMode>,
);
