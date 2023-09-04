import axios from "axios"
// import { message } from "ant-design-vue"
// import {
//   Loading
// } from '../util/utils.js';
import Cookies from "@/utils/cookie.js"
// import Router from "@/router/index"
import { showToast } from "vant"
import bus from "@/utils/eventbus"
// import { useAppStore } from "@/stores/app"
// const appStore = useAppStore()
const pendingMap = new Map()
// var loading = null;
export default function (config, options) {
  //判断是否要展示loading 需要配置则在增加{loading:true} 默认false
  // let loadingStatus = options?.loading || false;
  //判断是否要展示消息 需要配置则在增加{message:true} 默认false
  // let messageStatus = options?.message || false
  // //判断是否要展示 接口正确的消息 需要配置则在增加{message:true} 默认true
  // let messageSuccessStatus = true
  // if (options && options.messageSuccessStatus == false) messageSuccessStatus = false
  // //判断是否展示未格式化的数据 需要配置则在增加{rawData:true} 默认false
  // let rawData = options?.rawData || false
  let token = Cookies.get("wy_token")

  let headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'multipart/form-data;',
    // "Content-Type": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  }
  if (token) headers["Authorization"] = `Bearer ${token}`
  const service = axios.create({
    // baseURL: '', // 设置统一的请求前缀
    baseURL: import.meta.env.VITE_APP_WEB_URL ? import.meta.env.VITE_APP_WEB_URL : "https://fin-api.bytego123.com/prod", // 设置统一的请求前缀
    timeout: 100 * 1000, // 设置统一的超时时长
    headers,
    withCredentials: false, // default
  })

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      addPending(config)
      //发起请求的时候 展示loading
      // !loadingStatus || (loading = Loading());

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      //返回请求的时候关闭loading
      // if (loading && loading.close) {
      //  !loadingStatus || loading.close();
      //  loading = null;
      // }

      // let data = JSON.parse(response.data)

      // if (data.code == 200) { //如果返回成功则返回数据 错误只能拿到null
      //     return rawData ? response : data;
      // } else {
      //     return null;
      // }
      // return data
      // console.log(response,"is response");

      if (response.data.code === 2) {
        // if (document?.body?.clientWidth > 1200) {
        showToast({
          duration: 2000,
          message: response?.data?.message,
          // message: res.message,
          type: "fail",
          icon: new URL("@/assets/img/common/icon_fail.png", import.meta.url).href,
          className: "toast-web3",
        })
        // }

        // appStore.$patch((state) => {
        //   state.userInfo = null
        //   Cookies.remove("wy_userInfo")
        // })

        Cookies.remove("wy_userDid")

        Cookies.remove("wy_token")
        Cookies.remove("wy_code")
        Cookies.remove("wy_userInfo")
        bus.emit("removeUserInfo")

        window.location.href = window.location.origin + "/#/mine"

        // router.push('/mine')

        // 这里如果要设置弹窗，可以设置bus总线，bus.emit，用不了pinia
        // appStore.$patch((state) => {
        //   state.loginInfoShow = true
        // })
      } else if (response.data.code !== 0) {
        showToast({
          duration: 2000,
          message: response?.data?.message,
          // message: res.message,
          type: "fail",
          icon: new URL("@/assets/img/common/icon_fail.png", import.meta.url).href,
          className: "toast-web3",
        })
      }
      return response.data
    },
    (error) => {
      //返回请求的时候关闭loading
      // !loadingStatus || loading.close(), loading = null;
      // error.config && removePending(error.config);
      // if(error.config){
      //     removePending(error.config);
      // }
      return Promise.reject(error)
    }
  )

  return service(config)
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
  let { url, method, params, data } = config
  if (typeof data === "string") data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&")
}
