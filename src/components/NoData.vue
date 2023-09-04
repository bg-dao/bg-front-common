<template>
  <div class="nodataPC" v-if="!isMobile">
    <div class="flex flex-column flex-jus-center">
      <img src="@/assets/img/common/nodata.png" alt="nodata" />
      <div>暂无数据</div>
    </div>
  </div>
  <div class="noData" v-else>
    <!-- <img src="@/assets/img/common/nodata.png" class="noData-img" /> -->
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
  width: 1000px;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 40px;
  text-align: center;
  font-size: 16px;
  // color: #bdd6ed;
  color: #8e8e99;
  font-weight: 500;
  img {
    width: 125px;
    // height: 62px;
    height: auto;
    display: block;
    margin-bottom: 14px;
  }
}
/* prettier-ignore */
.noData {
  padding-top: 15vh;
  font-size: 26PX;
  font-weight: 500;
  // color: rgba(189,214,237,0.5);
  color: #8e8e99;
  text-align: center;
  .noData-img {
    width: 220PX;
    // height: 104PX;
    margin: 0 auto;
    margin-bottom: 20PX;
    display: block;
  }
}
</style>
