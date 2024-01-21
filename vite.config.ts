/// <reference types="vite-plugin-svgr/client" />
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: { alias: { "@": resolve(__dirname, "src") } },
});