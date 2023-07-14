import { fileURLToPath, URL} from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// antd的cssinjs自带自动导入
// import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// vitePluginImp({
		// 	libList:[
		// 		{
		// 			libName: "antd",
		// 			style: (name) => `antd/es/${name}/style`
		// 		}
		// 	]
		// })
	],
	resolve:{
		alias:{
			// 需要配合tsconfig.json里的paths配置
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	build:{

	},
	css:{
		// 配置css-module
		modules:{
			localsConvention: "camelCase",
			generateScopedName: "[local]-[hash:base64:5]"
		}
	}
});
