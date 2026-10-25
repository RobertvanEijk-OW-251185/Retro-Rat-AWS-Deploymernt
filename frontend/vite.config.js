import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// module.exports = defineConfig({
// 	server: {
// 		open: true,
// 		port: 5173,
// 	},
// });

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
});
