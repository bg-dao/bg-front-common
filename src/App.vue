<template>
  <router-view></router-view>
</template>

<script>
import { ref, getCurrentInstance, watchEffect, watch, computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue"
import { useAppStore } from "@/stores/app.js"
export default {
  components: {},
  setup() {
    //getCurrentInstance 支持访问内部组件实例,只能在 setup 或生命周期钩子中调用。
    //如需在 setup 或生命周期钩子外使用，请先在 setup 中调用 getCurrentInstance()
    //获取该实例然后再使用。
    const { proxy, ctx } = getCurrentInstance()

    const appStore = useAppStore()
    const isMobile = computed(() => appStore.isMobile)

    const checkMobile = () => {
      let isMobile = false
      if (document?.body?.clientWidth < 1200) isMobile = true
      appStore.$patch((state) => {
        state.isMobile = isMobile
      })
    }
    onBeforeMount(() => {
      checkMobile()
      window.addEventListener("resize", checkMobile)
    })
    onMounted(() => {
      // setTimeout(() => {
      //   // ctx.$refs.test.click()
      //   // document.querySelector("#test").dispatchEvent(new Event("input"))
      //   // var input = document.createElement("input")
      //   // // input.style = "display: none"
      //   // input.setAttribute("type", "file")
      //   // input.click()
      //   var ev = document.createEvent("MouseEvents")
      //   ev.initEvent("click", true, true)
      //   ctx.$refs.test.dispatchEvent(ev)
      // }, 3000)
      // document.addEventListener(
      //   "touchmove",
      //   function (e) {
      //     e.preventDefault()
      //   },
      //   false
      // )
      // var overscroll = function (el) {
      //   el.addEventListener("touchstart", function () {
      //     var top = el.scrollTop,
      //       totalScroll = el.scrollHeight,
      //       currentScroll = top + el.offsetHeight
      //     //If we're at the top or the bottom of the containers
      //     //scroll, push up or down one pixel.
      //     //
      //     //this prevents the scroll from "passing through" to
      //     //the body.
      //     if (top === 0) {
      //       el.scrollTop = 1
      //     } else if (currentScroll === totalScroll) {
      //       el.scrollTop = top - 1
      //     }
      //   })
      //   el.addEventListener("touchmove", function (evt) {
      //     //if the content is actually scrollable, i.e. the content is long enough
      //     //that scrolling can occur
      //     if (el.offsetHeight < el.scrollHeight) evt._isScroller = true
      //   })
      // }
      // overscroll(document.querySelector("#app"))
      // document.body.addEventListener("touchmove", function (evt) {
      //   //In this case, the default behavior is scrolling the body, which
      //   //would result in an overflow.  Since we don't want that, we preventDefault.
      //   if (!evt._isScroller) {
      //     evt.preventDefault()
      //   }
      // })
    })
    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkMobile)
    })
  },
  methods: {
    // test22() {
    //   var ev = document.createEvent("MouseEvents")
    //   ev.initEvent("click", true, true)
    //   this.$refs.test.dispatchEvent(ev)
    // },
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: $font-size-md;
  color: $color5;
}
</style>
