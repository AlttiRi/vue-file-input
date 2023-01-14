import {defineConfig, splitVendorChunkPlugin} from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
  ],
  server: {
    open: "/"
  },
  base: "./", // Required for GitHub Pages
  build: {
    target: "es2020",
    sourcemap: true,
    rollupOptions: {
      plugins: [
        sourceMapsPathChangerPlugin([
          // Use "../../" instead of "../" if resources are in "assets/" directory
          ["../node_modules/", "node-modules:///"],
          ["../vite/", "node-modules:///vite/"],
          ["../src/", "source-maps:///"],
          ["../", "source-maps:///"],
        ]),
      ],
      output: {
        entryFileNames: `[name].js`, // `[name].[hash].[format].js`
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    },
    minify: "terser",
    terserOptions: {
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      }
    }
  }
});

function sourceMapsPathChangerPlugin(pathsMapping = []) {
  function changeSourceMapPaths(map) {
    function _beautify(str) {
      return pathsMapping.reduce((pre, [value, replacer]) => {
        return pre.replace(value, replacer)
      }, str);
    }
    for (let i = 0; i < map.sources.length; i++) {
      map.sources[i] = _beautify(map.sources[i]);
    }
    return map;
  }
  return {
    name: "source-maps-path-changer-plugin",
    async generateBundle(options, bundle, isWrite) {
      Object.keys(bundle).forEach(key => {
        const map = bundle[key]?.map;
        if (map) {
          bundle[key].map = changeSourceMapPaths(map);
        }
      });
    }
  }
}
