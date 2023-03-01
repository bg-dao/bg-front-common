<template>
  <div>
    <div class="headerPC flex" v-if="!isMobile">
      <router-link to="/" class="flex"><img src="@/assets/img/header/logo.png" alt="logo" class="headerPC-logo" /></router-link>

      <div class="headerPC-navGap flex">
        <!-- target="_blank" -->
        <router-link v-for="(item, index) in navList" :key="index" :to="'/' + item.route" :class="{ active: item.route == $route.name }">{{ item.name }}</router-link>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { useAppStore } from "@/stores/app.js"
import { onBeforeMount, onBeforeUnmount, computed } from "vue"
import { useRouter } from "vue-router"
export default {
  name: "headerBar",
  data() {
    return {
      navList: [
        {
          name: "首页",
          route: "index",
        },
        {
          name: "区块",
          route: "block",
        },
        {
          name: "交易",
          route: "tx",
        },
        // {
        //   name: '存证',
        //   route: 'deposit'
        // },{
        //   name: '溯源',
        //   route: 'trace'
        // }
      ],
      headerOverLay: false,
      scrolNumber: 0,
    }
  },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const isMobile = computed(() => appStore.isMobile)

    return {
      isMobile,
    }
  },
}
</script>

<style lang="scss">
.headerPC {
  width: 100%;
  padding: 0 48px;
  height: 88px;
  // line-height: 88px;
  .headerPC-logo {
    width: 120px;
    height: 33px;
    margin-right: 88px;
  }
  .headerPC-navGap {
    gap: 52px;
  }
  a {
    font-size: $fontS3;
    color: $color4;
    &.active {
      color: $colorB;
      font-weight: 600;
    }
    &:hover {
      color: $colorB;
      font-weight: 600;
    }
  }
}
</style>
