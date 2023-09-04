import { onMounted, onUpdated } from "vue"
import { copyText } from "@/utils/format"
import { showToast } from "vant"
export function useCopyCode() {
  function copyCodeBlock() {
    let codeBlockWrapper = document.querySelectorAll(".code-block-wrapper")
    codeBlockWrapper.forEach((wrapper) => {
      let copyBtn = wrapper.querySelector(".code-block-header__copy")
      let codeBlock = wrapper.querySelector(".code-block-body")
      if (copyBtn && codeBlock) {
        if (document?.body?.clientWidth < 1200) {
          copyBtn.addEventListener(
            "touchstart",
            () => {
              // copyBtn.style.color = "#00a67d"
              copyBtn.style.color = "#6967FF"
            },
            false
          )
          copyBtn.addEventListener(
            "touchend",
            () => {
              copyBtn.style.color = "#EFEFFC"
            },
            false
          )
        }

        copyBtn.addEventListener("click", () => {

          // console.log("windooo  window.isSecureContext +",window.isSecureContext);
          if (navigator.clipboard?.writeText && window.isSecureContext) {
            // console.log("windooo copy 111111111111111111111");
            navigator.clipboard.writeText(codeBlock.textContent ?? "")
            console.log("复制成功", copyBtn)
            // showToast('复制成功');
            showToast({
              message: "复制成功",
              type: 'success',
              duration: 1000,
              icon: new URL("@/assets/img/common/icon_success.png", import.meta.url).href,
              className: "toast-web3",
            })
            // copyBtn.style.color = 'green'
          } else {
            // console.log("windooo copy copyText");
            copyText({ text: codeBlock.textContent ?? "", origin: true, copyBtn })
          }
        })
      }
    })
  }

  onMounted(() => copyCodeBlock())

  onUpdated(() => copyCodeBlock())
}