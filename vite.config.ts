import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import postcsspxtoviewport from "postcss-px-to-viewport"
import vitePluginImp from 'vite-plugin-imp'
import eslintPlugin from "vite-plugin-eslint"
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		// EsLint 报错信息显示在浏览器界面上
		eslintPlugin(),
		vitePluginImp({
			libList: [
				// 按需加载antd组件和样式
				{
					libName: 'antd',
					style: (name) => `antd/es/${name}/style`
				}
			]
		}),
		themePreprocessorPlugin({
			less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: 'theme-light',
            path: path.resolve("src/theme/light.less"),
          },
          {
            scopeName: 'theme-dark',
            path: path.resolve("src/theme/dark.less"),
          },
        ],
      },
		})
	],

  // Vite optons tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: ["es2021", "chrome100", "safari13"],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
	resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
	css: {
		postcss: {
			plugins: [
				postcsspxtoviewport({
					unitToConvert: "px", // 要转化的单位
					viewportWidth: 750, // UI设计稿的宽度
					unitPrecision: 5, // 转换后的精度，即小数点位数
					propList: ["*", "!font*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
					viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
					fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
					selectorBlackList: [], // 指定不转换为视窗单位的类名，
					minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
					mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
					replace: true, // 是否转换后直接更换属性值
					// exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
					exclude: [/node_modules/],
					landscape: false, // 是否处理横屏情况
				}),
			]
		},
		preprocessorOptions: {
			less: {
				// modifyVars: {
				// 	'primary-color': '#1DA57A',
				// 	'link-color': '#1DA57A',
				// 	'border-radius-base': '2px',
				// },
				// 支持内联 JavaScript
        javascriptEnabled: true,
				additionalData: `@import '${path.resolve(__dirname, 'src/theme/default.less')}';`
			}
		}
	},
});
