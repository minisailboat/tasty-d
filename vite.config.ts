import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import postcssConfig from "./postcss.config";
import uvtw from "@uni-helper/vite-plugin-uni-tailwind";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: postcssConfig,
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/index.scss";`,
			},
		},
	},
	plugins: [uni(), uvtw()],
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "[name]-[hash][extname]",
			},
		},
	},
	server: {
		port: 10051,
	},
});
