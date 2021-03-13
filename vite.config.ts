import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import postcss from 'postcss'
import lessParser from 'postcss-less'
import postcssImport from 'postcss-import'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'

function loadGloalStyles(...paths: string[]) {
  const styles = Promise.all(
    paths.map((path) =>
      postcss().use(postcssImport()).process(readFileSync(path, 'utf8'), {
        from: path,
        parser: lessParser,
      })
    )
  ).then((results) => results.join(''))
  return (content: string) => styles.then((res) => res + content)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    jsx(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '/src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: loadGloalStyles('./src/styles/variables.less', './src/styles/mixins.less'),
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://my-json-server.typicode.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    polyfillDynamicImport: true,
    chunkSizeWarningLimit: 200,
    rollupOptions: {
      output: {
        manualChunks: {
          vender: ['vue', 'pinia', 'vue-router'],
          libs: ['vue-request', 'lodash'],
        },
      },
    },
  },
})
