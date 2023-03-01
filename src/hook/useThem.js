import { ref } from "vue"
const useThem = () => {
  const isDarkThem = ref(false) // 是否是暗黑主题
  // 主题切换
  const changeThem = () => {
    if (isDarkThem.value) {
      document.getElementsByTagName("body")[0].style.setProperty("--font-color", "#fff")
      document.getElementsByTagName("body")[0].style.setProperty("--bg-color", "#000")
    } else {
      document.getElementsByTagName("body")[0].style.setProperty("--font-color", "#333")
      document.getElementsByTagName("body")[0].style.setProperty("--bg-color", "#ccc")
    }
  }
  return { isDarkThem, changeThem }
}

export { useThem }
