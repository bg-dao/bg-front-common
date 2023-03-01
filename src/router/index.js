import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes.js"

// console.log("routes ", routes)

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
  // routes: [
  //   {
  //     path: "/",
  //     component: () => import("@/layouts/Default.vue"),
  //     // redirect: "/home",
  //     children: [
  //       {
  //         path: "",
  //         name: "index",
  //         meta: {
  //           title: "home",
  //         },
  //         component: () => import("@/views/index/Index.vue"),
  //       },
  //     ],
  //   },
  //   // {
  //   //   path: "*", // 首页
  //   //   redirect: "/",
  //   // },
  // ],
  scrollBehavior(to, from, savedPosition) {
    // if (savedPosition) {
    //   return { ...savedPosition, behavior: "smooth" }
    // } else {
    //   return { left: 0, top: 0, behavior: "smooth" }
    // }
    return { left: 0, top: 0, behavior: "smooth" }
  },
})

Router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default Router
