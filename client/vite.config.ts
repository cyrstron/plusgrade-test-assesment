import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";
import styleX from "vite-plugin-stylex";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/tax-calculator/tax-year": {
				target: "http://localhost:5001",
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: "../static",
		emptyOutDir: true, // also necessary
	},
	plugins: [
		react(),
		styleX({}),
		biomePlugin({
			mode: "lint",
			files: "./src",
		}),
	],
});
