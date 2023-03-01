import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"
import postCssPxToViewport from "postcss-px-to-viewport"
// import ElementPlus from "unplugin-element-plus/vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    // ElementPlus(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: "PX", // 默认值`px`，需要转换的单位
          viewportWidth: 750, // 视窗的宽度,对应设计稿宽度
          viewportHeight: 1334, // 视窗的高度, 根据375设备的宽度来指定，一般是667，也可不配置
          unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数
          propList: ["*"], // 转化为vw的属性列表
          viewportUnit: "vw", // 指定需要转换成视窗单位
          fontViewportUnit: "vw", // 字体使用的视窗单位
          selectorBlaskList: [".ignore-"], // 指定不需要转换为视窗单位的类
          mediaQuery: false, // 允许在媒体查询中转换`px`
          minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
          replace: true, // 是否直接更换属性值而不添加备用属性
          exclude: [], // 忽略某些文件夹下的文件或特定文件
          landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: "vw", // 横屏时使用的单位
          landscapeWidth: 1200, // 横屏时使用的视窗宽度
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/_variable.scss";`,
      },
    },
  },
  // 服务配置
  server: {
    host: "0.0.0.0",
    port: 11004,
    https: false,
    open: true,
    hmr: true,
    proxy: {},
  },
})
