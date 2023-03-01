<template>
  <div v-if="!isMobile" class="indexPC"></div>
</template>

<script>
import { ref, getCurrentInstance, computed, reactive, toRefs, onMounted, onBeforeMount } from "vue"
import { onBeforeRouteLeave, useRouter } from "vue-router"

import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
export default {
  components: {},
  setup() {
    let { proxy } = getCurrentInstance()
    const appStore = useAppStore()
    const isMobile = computed(() => appStore.isMobile)
    const state = reactive({})

    return {
      isMobile,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped></style>
