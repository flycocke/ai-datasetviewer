
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import legacy from '@vitejs/plugin-legacy'

import dts from 'vite-plugin-dts'
// import typescript from 'rollup-plugin-typescript2'

// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
// import eslint from '@rollup/plugin-eslint';
// import eslint from 'vite-plugin-eslint'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);



// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const { mode } = configEnv
  const VITE_TYPE = loadEnv(mode, process.cwd()).VITE_TYPE
  console.log(VITE_TYPE)
  const generateScopedName = "[name]__[hash:base64:5]";
  process.env.mode = mode

  const isDev = configEnv.mode === 'development'
  const isPro = configEnv.mode === 'production'
  const isLib = configEnv.mode === 'lib'

  if (isLib) {
    return {
      plugins: [
        splitVendorChunkPlugin(),
        dts({
          
        })

      ],
      // 打包配置
      build: {
        outDir: `lib`,

        lib: {
          entry: resolve(__dirname, 'src/components/DatasetViewer/index.ts'),
          name: 'datasetViewer',
          // the proper extensions will be added
          formats: ['es', 'umd'],
          fileName: (format) => `${format}/index.${format}.js`
        },
        sourcemap: false,

        target: 'esnext',
        minify: 'esbuild', // 混淆器，terser构建后文件体积更小
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: [

          ],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {

            }
          }
        }
      }
    }
  }

  return {
    server:{
      host:"0.0.0.0"
    },

    plugins: [


      react({
        fastRefresh: true,
        babel: {
          babelrc: true,
          configFile: true
        },
      }),

      isPro && legacy({
        targets: ['defaults', 'not IE 11']
      }),
      // dynamicImportVars({
      //   // options
      // }),

      svgr({
        include: '**/*.svg',
        exportAsDefault: false,
      }),

      // 编译器提示就够了其实，没必要写进进程
      // isDev && eslint({
      //   /* your options */

      // }),
      splitVendorChunkPlugin()
    ].filter(Boolean),


    css: {
      modules: {
        generateScopedName: generateScopedName
      },
    },

    build: {

      rollupOptions: {

      }
    },

    resolve: {
      alias: {
        '@src': resolve(projectRootDir, 'src'),
        '@assets': resolve(projectRootDir, 'src/assets'),
        '@view': resolve(projectRootDir, 'src/view'),
        '@router': resolve(projectRootDir, 'src/router'),
      }
    }
  }
})
