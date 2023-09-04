<template>
  <div class="text-black">
    <div class="markdown-body" v-html="text" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useAppStore } from "@/stores/app"
import MarkdownIt from "markdown-it"
import mdKatex from "@traptitech/markdown-it-katex"
import hljs from "highlight.js"

const props = defineProps({
  inversion: Boolean,
  error: Boolean,
  text: String,
  loading: Boolean,
})
// const props = defineProps()

// console.log(props.inversion, props.loading, props.text);

// const { isMobile } = useBasicLayout()
const appStore = useAppStore()
const isMobile = computed(() => appStore.isMobile)

const textRef = ref(null)

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ""
      return highlightBlock(hljs.highlight(lang, code, true).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, "")
  },
})

mdi.use(mdKatex, { blockClass: "katexmath-block rounded-md p-[10px]", errorColor: " #cc0000" })

const wrapClass = computed(() => {
  return ["text-wrap", "min-w-[20px]", "rounded-md", isMobile.value ? "p-2" : "px-3 py-2", props.inversion ? "bg-[#d2f9d1]" : "bg-[#f4f6f8]", props.inversion ? "dark:bg-[#a1dc95]" : "dark:bg-[#1e1e20]", { "text-red-500": props.error }]
})

const text = computed(() => {
  const value = props.text ?? ""
  // console.log('最后的内容', value);
  // if (!props.inversion)
  return mdi.render(value)
  // return value
})

function highlightBlock(str, lang) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

defineExpose({ textRef })
</script>

<style lang="scss">
@import url(./style.scss);
</style>
