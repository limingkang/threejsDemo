import { defineConfig } from 'vite'
const { baseConfig } = require('./shared/config');

export default defineConfig({
  server: {
    port: 1994,
    host: '0.0.0.0'
  },
  ...baseConfig,
  build: {
    outDir: 'public/demo',
    commonjsOptions: {
      transformMixedEsModules: true, // https://github.com/originjs/vite-plugins/issues/9
    },
  },
})
