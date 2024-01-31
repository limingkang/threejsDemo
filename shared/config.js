const { defineConfig } = require('vite');
const path = require('path');
const vue = require('@vitejs/plugin-vue');
// const vueJsx = require('@vitejs/plugin-vue-jsx');
// const analyze = require('rollup-plugin-analyzer')
// const { viteCommonjs } = require('@originjs/vite-plugin-commonjs');

function resolve(dir) {
    return path.join(__dirname, dir);
}

let plugins = [vue()];
// if (process.env.USE_ANALYZE) {
//   plugins.push(analyze());
// }

exports.baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins,
    resolve: {
      alias: {
        '@': resolve('../../src'),
      },
      dedupe: ['vue']
    },
    // css: {
    //   postcss: {
    //     plugins: [
    //       require('postcss-px-to-viewport-update')({
    //         viewportWidth: 1080,
    //         viewportUnit: 'vw',
    //         minPixelValue: 1,
    //         decimal: 3,
    //         exclude: /node_modules/i
    //       }),
    //     ]
    //   }
    // },
});
