const index = {
  path: "/",
  component: () => import("@/layouts/Default.vue"),
  children: [
    {
      path: "",
      name: "index",
      meta: {
        title: "index",
      },
      component: () => import("@/views/index/Index.vue"),
    },
  ],
}

export default index
