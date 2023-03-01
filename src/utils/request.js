import axios from "axios"
// import { message } from "ant-design-vue"
// import {
//   Loading
// } from '../util/utils.js';

// import Router from "@/router/index"
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

  const service = axios.create({
    // baseURL: '', // 设置统一的请求前缀
    baseURL: import.meta.env.VITE_APP_WEB_URL ? import.meta.env.VITE_APP_WEB_URL : "http://192.168.11.251:30039", // 设置统一的请求前缀
    timeout: 15000, // 设置统一的超时时长
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'multipart/form-data;',
      // "Content-Type": "application/json",
      'Content-Type': 'application/json;charset=UTF-8',
    },
    transformRequest: [
      function (data, headers) {
        // 对 data 进行任意转换处理
        return JSON.stringify(data)
        // return data
        // return qs.parse(data)
      },
    ],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [
      (data) => {
        // 对 data 进行任意转换处理
        let res = JSON.parse(data) //返回数据类型转换
        // console.log(res, "transformResponse-res");
        // if (res?.code == 200) {
        //   messageSuccessStatus && messageStatus && res.msg && message.success(res.msg)
        // } else if (res?.code == 500 || res?.code == 400) {
        //   messageStatus && res.msg && message.error(res.msg)
        // }
        // else {
        //     !messageStatus || message.warning(res.message)
        // }

        return data
      },
    ],
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    //     return qs.stringify(params, { arrayFormat: 'brackets' })
    // },
    // `withCredentials` 表示跨域请求时是否需要使用凭证
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

      let data = JSON.parse(response.data)

      // if (data.code == 200) { //如果返回成功则返回数据 错误只能拿到null
      //     return rawData ? response : data;
      // } else {
      //     return null;
      // }
      return data
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
