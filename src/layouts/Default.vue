<template>
  <div>
    <div class="defaultLayoutPC">
      <!-- <div class="defaultLayoutPC-linear"></div>
      <div class="defaultLayoutPC-layout">
        <Header></Header>
        <div class="routerView">
          <router-view></router-view>
        </div>
        <Foot></Foot>
        <ScrollBall></ScrollBall>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Header from "@/components/Header.vue"
// import Foot from "@/components/Foot.vue"
// import ScrollBall from "@/components/ScrollBall.vue"
// import { useAppStore } from "@/stores/app.js"
// import { onBeforeMount, onBeforeUnmount, computed } from "vue"
export default {
  name: "DefaultLayout",
  components: {
    // Header,
    // Foot,
    // ScrollBall,
  },
  setup() {
    // const appStore = useAppStore()
    // const isMobile = computed(() => appStore.isMobile)
    // const checkMobile = () => {
    //   let isMobile = false
    //   if (document?.body?.clientWidth < 1200) isMobile = true
    //   appStore.$patch((state) => {
    //     state.isMobile = isMobile
    //   })
    // }
    // onBeforeMount(() => {
    //   window.addEventListener("resize", checkMobile)
    // })
    // onBeforeUnmount(() => {
    //   window.removeEventListener("resize", checkMobile)
    // })
    // return {
    //   isMobile,
    // }
  },
}
</script>

<style lang="scss">
.defaultLayoutPC {
  color: $color1;
  min-height: 100vh;
  background: $bgColor;
  position: relative;
  .defaultLayoutPC-linear {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 306px;
    background: linear-gradient(180deg, #d8ecff 0%, #f5f6fa 100%);
  }
  .defaultLayoutPC-layout {
    position: relative;
    z-index: 2;
    .routerView {
      min-height: calc(100vh - 88px - 234px);
    }
  }
}
.defaultLayout {
  color: $color1;
  min-height: 100vh;
  background: $bgColor;
}
</style>
