<template>
  <div class="nodataPC" v-if="!isMobile">
    <div class="flex flex-column flex-jus-center">
      <img src="@/assets/img/common/nodata.png" alt="nodata" />
      <div>暂无数据</div>
    </div>
  </div>
  <div class="noData" v-else>
    <!-- <img src="@/assets/img/common/mobileNodata.png" class="noData-img" /> -->
    <img src="@/assets/img/common/nodata.png" alt="nodata" class="noData-img" />
    <div>暂无数据</div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useAppStore } from "@/stores/app"

export default {
  setup() {
    const appStore = useAppStore()
    const isMobile = computed(() => appStore.isMobile)

    return {
      isMobile,
    }
  },
}
</script>
<style lang="scss" scoped>
.nodataPC {
  width: 1140px;
  margin: 0 auto;
  padding-top: 150px;
  padding-bottom: 150px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  // color: #bdd6ed;
  color: rgba(0, 0, 0, 0.65);
  img {
    width: 85px;
    height: 62px;
    display: block;
    margin-bottom: 14px;
  }
}
/* prettier-ignore */
.noData {
  padding-top: 30vh;
  font-size: 26PX;
  font-weight: 400;
  // color: rgba(189,214,237,0.5);
  color: rgba(0,0,0,0.65);
  text-align: center;
  .noData-img {
    width: 142PX;
    // height: 104PX;
    margin: 0 auto;
    margin-bottom: 20PX;
    display: block;
  }
}
</style>
