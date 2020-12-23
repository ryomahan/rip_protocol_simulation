import Vue from "vue"
import VueRouter from "vue-router"
import Overview from "../views/overview/index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "overview",
    component: Overview
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  window.document.title = "路由选择协议模拟"
})

export default router
