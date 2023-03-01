<template>
  <div v-show="scrolNumber > 5 && !isMobile" class="scrollBall" @click="gotoScroll">
    <img src="@/assets/img/common/scrollBall.png" class="scrollBall-normol" />
    <img src="@/assets/img/common/scrollBallHover.png" class="scrollBall-hover" />
  </div>
</template>
<script>
import { useAppStore } from "@/stores/app.js"
import { mapState } from "pinia"
export default {
  name: "scrollBall",
  data() {
    return {
      scrolNumber: 0,
    }
  },
  computed: {
    ...mapState(useAppStore, ["isMobile"]),
  },
  mounted() {
    this.scrolNumber = document?.documentElement?.scrollTop || document?.body?.scrollTop || window.pageYOffset || 0
    window.addEventListener("scroll", this.scrollToTop)
  },
  beforeDestroy() {},
  methods: {
    gotoScroll() {
      // document.documentElement.scrollTop = 0
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    },
    scrollToTop() {
      this.scrolNumber = document?.documentElement?.scrollTop || document?.body?.scrollTop || window.pageYOffset
      // console.log(this.scrolNumber,"this.scrolNumber");
    },
  },
}
</script>
<style lang="scss">
.scrollBall {
  color: #fff;
  position: fixed;
  bottom: 40px;
  right: 50px;
  width: 62px;
  height: 62px;
  cursor: pointer;
  img {
    width: 62px;
    height: 62px;
  }
  .scrollBall-hover {
    display: none;
  }
  .scrollBall-normol {
    display: block;
  }
  &:hover .scrollBall-normol {
    display: none;
  }
  &:hover .scrollBall-hover {
    display: block;
  }
}
// html {
//   scroll-behavior: smooth;
// }
</style>
