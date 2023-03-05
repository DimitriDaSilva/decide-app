import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";
import * as path from "path";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
  },
  plugins: [reactPlugin(), svgrPlugin()],
});
