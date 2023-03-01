import { defineStore } from "pinia"

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    teacherName: "艾伦",
    userList: [
      { name: "小明", age: 18 },
      { name: "小李", age: 15 },
      { name: "小白", age: 16 },
    ],
  }),
  // other options...
})
