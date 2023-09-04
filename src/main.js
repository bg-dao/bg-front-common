import { createApp } from "vue"
import { createPinia } from "pinia"
import "vant/es/toast/style"
import "./assets/css/flex.css"
import "./assets/css/github-markdown.css"
import "./assets/css/highlight.css"
import "./assets/css/atomic.css"
import "./assets/css/safari.css"
import "./assets/css/ss.scss"
// import "./assets/css/load.css"
import App from "@/App.vue"
import router from "@/router"

import { formatNumber, formatNumber2, formatHash, copyText, getWEUnit, toFixed, getWEUnit2 } from "@/utils/number.js"
import request from "@/utils/request.js"
import { Toast, Overlay, Popup, showToast } from "vant"
import directives from "./directives" // 全局指令

// import { ElLoading } from "element-plus"
// console.log("ElementPlus", ElementPlus)

const pinia = createPinia()
const app = createApp(App)
//配置全局变量
app.config.globalProperties.$http = request
app.config.globalProperties.$formatNumber = formatNumber
app.config.globalProperties.$formatNumber2 = formatNumber2
app.config.globalProperties.toFixed = toFixed
app.config.globalProperties.$formatHash = formatHash
app.config.globalProperties.$getWEUnit = getWEUnit
app.config.globalProperties.$getWEUnit2 = getWEUnit2
app.config.globalProperties.$showToast = showToast
app.config.globalProperties.$toast = showToast
app.config.globalProperties.$copyText = copyText

// 注册全局指令
for (const i in directives) {
  app.directive(i, directives[i])
}
// app.use(ElLoading)
app.use(pinia)
app.use(router)
app.use(Toast)
app.use(Overlay)
app.use(Popup)
app.mount("#app")

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
  return format
}

app.config.globalProperties.$formatTime = (time) => {
  if (!time) return "-"
  return new Date(time).format("yyyy-MM-dd")
}

app.config.globalProperties.$formatTimeDS = (time) => {
  if (!time) return "-"
  return new Date(time).format("yyyy-MM-dd hh:mm")
}

app.config.globalProperties.$formatTimeFull = (time) => {
  if (!time) return "-"
  return new Date(time).format("yyyy-MM-dd hh:mm:ss")
}

app.directive("visible", (el, binding) => {
  let value = !!binding.value
  if (value) {
    el.style.visibility = "visible"
  } else {
    el.style.visibility = "hidden"
  }
})
