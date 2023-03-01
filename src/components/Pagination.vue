<template>
  <template v-if="totalPage != 0 && totalPage > 0">
    <div class="PaginationPC flex flex-jus-end" v-if="!isMobile">
      <div>共 {{ totalItem }} 条</div>
      <div class="PaginationPC-arrow text-flex-center" @click="gotoPage(currentPage > 2 ? currentPage - 1 : 1)"><img src="@/assets/img/common/arrow_left.png" alt="" /></div>
      <div class="flex">
        <div class="PaginationPC-box" @click="gotoPage(1)" :class="{ boxActive: currentPage == 1 }">1</div>
        <div class="PaginationPC-box boxEllipsis" v-if="currentPage >= 4" @click="gotoPage(currentPage - 1)">...</div>
        <template v-if="currentPage <= 3">
          <div class="PaginationPC-box" @click="gotoPage(2)" :class="{ boxActive: currentPage == 2 }" v-if="totalPage >= 2">2</div>
          <div class="PaginationPC-box" @click="gotoPage(3)" :class="{ boxActive: currentPage == 3 }" v-if="totalPage >= 3">3</div>
          <div class="PaginationPC-box" @click="gotoPage(4)" :class="{ boxActive: currentPage == 4 }" v-if="totalPage >= 4">4</div>
          <div class="PaginationPC-box" @click="gotoPage(5)" :class="{ boxActive: currentPage == 5 }" v-if="totalPage >= 5">5</div>
        </template>
        <template v-else>
          <div class="PaginationPC-box" @click="gotoPage(currentPage - 1)" v-if="currentPage - 1 < totalPage">{{ currentPage - 1 }}</div>
          <div class="PaginationPC-box boxActive" v-if="currentPage < totalPage">{{ currentPage }}</div>
          <div class="PaginationPC-box" @click="gotoPage(currentPage + 1)" v-if="currentPage + 1 < totalPage">{{ currentPage + 1 }}</div>
        </template>

        <div class="PaginationPC-box boxEllipsis" v-if="totalPage > 5 && currentPage + 2 < totalPage" @click="gotoPage(currentPage + 1)">...</div>
        <div class="PaginationPC-box" :class="{ boxActive: totalPage == currentPage }" @click="gotoPage(totalPage)" v-if="totalPage > 5">{{ totalPage }}</div>
      </div>
      <div class="PaginationPC-arrow text-flex-center" @click="gotoPage(currentPage < totalPage ? currentPage + 1 : totalPage)"><img src="@/assets/img/common/arrow_right.png" alt="" /></div>
      <div class="flex">
        <div>跳至</div>
        <div class="PaginationPC-page"><input type="number" maxlength="30" @keyup.enter="confirmPage" v-model="inputPage" /></div>
        <div>页</div>
      </div>
    </div>
    <div class="Pagination flex flex-jus-center" v-else>
      <div class="Pagination-front flex flex-jus-center" v-if="currentPage > 1" @click="gotoPage(currentPage - 1)">
        <img src="@/assets/img/common/arrow_left.png" alt="" />
        <div>上一页</div>
      </div>
      <div class="Pagination-front flex flex-jus-center" v-if="currentPage != totalPage" @click="gotoPage(currentPage + 1)">
        <div>下一页</div>
        <img src="@/assets/img/common/arrow_right.png" alt="" />
      </div>
    </div>
  </template>
</template>

<script>
import { reactive, toRefs, computed } from "vue"
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
export default {
  name: "Pagination",
  props: {
    currentStart: {
      default: 0,
      type: Number,
    },
    currentPage: {
      default: 1,
      type: Number,
    },
    totalItem: {
      default: 0,
      type: Number,
    },
    totalPage: {
      default: 1,
      type: Number,
    },
    limit: {
      default: 10,
      type: Number,
    },
  },
  emits: ["confirmPage"],
  setup(props, context) {
    const appStore = useAppStore()
    const isMobile = computed(() => appStore.isMobile)
    let state = reactive({
      isSelect: false,
      inputPage: "",
    })
    const confirmPage = () => {
      state.inputPage = parseInt(state.inputPage)
      // console.log(state.inputPage, "state.inputPage--props.totalPage", props.totalPage)
      if (isNaN(state.inputPage) || state.inputPage <= 0 || state.inputPage > props.totalPage) {
        state.inputPage = ""
        return
      }
      context.emit("confirmPage", state.inputPage)
      state.inputPage = ""
    }
    const gotoPage = (page) => {
      context.emit("confirmPage", page)
    }
    return {
      ...toRefs(state),
      isMobile,
      confirmPage,
      gotoPage,
    }
  },
}
</script>
<style lang="scss" scoped>
.PaginationPC {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0,0,0,0.45);
  div {
    cursor: default;
  }
  .PaginationPC-arrow {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #EEEEEE;
    margin-right: 16px;
    margin-left: 16px;
    cursor: pointer;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .PaginationPC-box {
    min-width: 32px;
    padding: 0 4px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #EEEEEE;
    margin-right: 8px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &.boxActive {
      // background: #2b355b;
      border-color: #1890FF;
      font-size: 14px;
      font-weight: 400;
      color: #1890FF;
    }
    &.boxEllipsis {
      border: none;
    }
  }
  .PaginationPC-page {
    padding: 0 11px;
    // min-width: 54px;
    // max-width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #EEEEEE;
    margin-right: 16px;
    margin-left: 16px;
    background: transparent;
    // width: 54px;
    input {
      background: transparent;
      width: 32px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0,0,0,0.65);
    }
  }
}

/* prettier-ignore */
.Pagination {
  margin-top: 40PX;
  gap: 64PX;
  .Pagination-front {
    width: 160PX;
    height: 64PX;
    background: #151C34;
    border-radius: 100PX;
    border: 1px solid #2B355B;
    font-size: 26PX;
    font-weight: 400;
    color: #BDD6ED;
    gap: 16PX;
    img {
      width: 13PX;
    }
  }
}
</style>
