import {defineConfig} from "vite";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vuePlugin(),
  ],
  base: "./",
  server: {
    open: "./"
  },
  esbuild: {
    target: "es2021",
    minifyIdentifiers: false
  },
  build: {
    target: "es2020",
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: (id) => {
          if (id.includes("@vue"))     { return "vue";  }
          if (id.includes("@alttiri")) { return "util"; }
        },
      }
    }
  }
});
