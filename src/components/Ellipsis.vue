<template>
  <div class="ellipsisList" v-for="(item, index) in ellipsisList" :key="index">{{ item }}</div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount } from "vue"

export default {
  setup() {
    let state = reactive({
      ellipsisList: ['.'],
      timer: null
    })
    onMounted(() => {
      state.timer = setInterval(() => {
        console.log('....++');
        if (state.ellipsisList.length < 3) state.ellipsisList.push('.')
        else state.ellipsisList = ['.']
      }, 500)
    })
    onBeforeUnmount(() => {
      clearInterval(state.timer)
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
<style lang="scss" scoped>
.ellipsisList {
  color: #fff;
}
</style>