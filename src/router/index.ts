import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "@/views/home/Home.vue";
import NewsVue from "@/views/news/News.vue";
import ProductVue from "@/views/product/Product.vue";
import NotFoundVue from '@/views/notFound/NotFound.vue'
import NewsItemVue from '@/views/news/NewsItem.vue'
import "nprogress/nprogress.css";
import "nprogress/nprogress.js";
import nProgress from "nprogress";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeVue,
    },
    {
      path: "/news",
      component: NewsVue,
    },
    {
      path: "/news/:id",
      component: NewsItemVue,
    },
    {
      path: "/product",
      component: ProductVue,
    },
    {
      path:'/:any*',
      component:NotFoundVue
    }
  ],
});

router.beforeEach((to,from,next)=>{
  nProgress.start()
  next()
})

router.afterEach((to,from)=>{
  nProgress.done()
})

export default router;
