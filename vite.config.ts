import { fileURLToPath, URL} from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// import react from "@vitejs/plugin-react-swc";
// antd的cssinjs自带自动导入
// import vitePluginImp from "vite-plugin-imp";


// https://vitejs.dev/config/
export default defineConfig((env) => {
	// 模式，路径(__dirname或process.cwd()), 变量前缀
	const {VITE_BASE_URL} = loadEnv(env.mode, __dirname, "VITE"); // 加载环境变量文件
	// console.log(__filename);
	// console.log(__dirname);
	// console.log(process.cwd());
	// console.log(import.meta);
	// console.log(config);
	return {
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
		base: VITE_BASE_URL,
		build:{
			outDir: "docs",
			emptyOutDir: true,
		},
		css:{
			// 配置css-module
			modules:{
				localsConvention: "camelCase",
				generateScopedName: "[local]-[hash:base64:5]"
			}
		}
	};
});
