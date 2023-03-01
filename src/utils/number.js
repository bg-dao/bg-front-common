// 格式化千分位
export function formatNumber(num) {
  // console.log(num, 'num');
  if (isNaN(num)) {
    return 0
  }
  num = String(num)
  let length = ("" + num).split(".").length
  let long = 0
  if (length > 1) {
    long = ("" + num).split(".")[1].length
  }
  // console.log(), "num");
  // 要用String 不然会在安卓的某个机子错误错误
  let fo = parseFloat(num).toLocaleString("en", { minimumFractionDigits: long })
  if (!fo) fo = String(parseFloat(num)).toLocaleString("en", { minimumFractionDigits: long })
  // return parseFloat(num).toLocaleString('en', { minimumFractionDigits: long });
  return fo
  // return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  // return ('' + num).replace(/(?<=(^|\s)\d+)(?=(\d{3})+\b)/g, ',');
  // return ('' + num).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

// KMB
export function getKMBUnit(num, decimal = 2) {
  if (num >= 1000000000) {
    return formatNumber(toFixed(accDiv(num, 1000000000), 2)) + "B"
  } else if (num >= 1000000) {
    return formatNumber(toFixed(accDiv(num, 1000000), 2)) + "M"
  } else if (num >= 10000) {
    return formatNumber(toFixed(accDiv(num, 1000), 2)) + "K"
  } else {
    return formatNumber(toFixed(num, decimal))
  }
}

// 检查类型
// Number、String、Undefined、Boolean、Object、Array、Function、Null、Symbol、Set、Map
export function checkType(arg) {
  let type = Object.prototype.toString.call(arg)
  return type.substring(0, type.length - 1).split(" ")[1]
}

// 返回小数位后几位 截取
// number 数值
// p 位数
export function toFixed(number, pp) {
  let num = isNaN(number) || !number ? 0 : number
  let p = isNaN(pp) || !pp ? 0 : pp
  num = getFullNum(num)
  var n = (num + "").split(".") // eslint-disable-line
  var x = n.length > 1 ? n[1] : "" // eslint-disable-line
  if (x.length > p) {
    // eslint-disable-line
    x = x.substr(0, p) // eslint-disable-line
  } else {
    // eslint-disable-line
    x += Array(p - x.length + 1).join("0") // eslint-disable-line
  } // eslint-disable-line
  return n[0] + (x == "" ? "" : "." + x) // eslint-disable-line
}

// 科学计数法转数值 - 处理 1e-7 这类精度问题
export function getFullNum(num) {
  // 处理非数字
  if (isNaN(num)) {
    return num
  }
  // 处理不需要转换的数字
  const str = String(num)
  if (!/e/i.test(str)) {
    return num
  }
  return Number(num)
    .toFixed(18)
    .replace(/\.?0+$/, "")
}

// formatHash
export function formatHash(str, len = 12) {
  if (!str || checkType(str) != "String") return ""
  return str.substr(0, len) + "..." + str.substr(str.length - len, str.length - 1)
}

import { Toast } from "vant"
export function copyText(text) {
  // console.log("navigator.clipboard.writeText is ", navigator?.clipboard?.writeText)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    navigator.clipboard.writeText(text)
    Toast({
      message: "复制成功",
      className: "ss-clipboard",
      duration: 2000,
      // duration: 2000 * 1000000,
      closeOnClick: true,
    })
    // return navigator.clipboard.writeText(text)
  } else {
    // 创建text area
    const textArea = document.createElement("textarea")
    textArea.style.width = "0px"
    textArea.style.height = "0px"
    textArea.className = "copyTextArea"
    window.textArea = textArea
    textArea.value = text
    // 使text area不在viewport，同时设置不可见
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    if (document.execCommand("copy")) {
      Toast({
        message: "复制成功",
        className: "ss-clipboard",
        duration: 2000,
        closeOnClick: true,
      })
    } else {
      Toast({
        message: "复制失败",
        className: "ss-clipboard",
        duration: 2000,
        closeOnClick: true,
      })
    }
    // document.execCommand("copy") ? console.log("yes copy") : console.log("err copy")
    setTimeout(() => {
      textArea.remove()
    }, 1000)
  }
}
