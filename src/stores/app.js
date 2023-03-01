import { defineStore } from "pinia"

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    isMobile: false,
  }),
  // other options...
})
