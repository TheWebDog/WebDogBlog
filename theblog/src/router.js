import Vue from 'vue'
import VueRouter from 'vue-router'

// 破除导航重复报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: () => {
        return import('./components/Home.vue')
      },
      children: [
        {
          path: '',
          name: '',
          component: () => {
            return import('./components/HomeBody.vue')
          }
        },
        {
          path: 'article',
          name: 'article',
          component: () => {
            return import('./components/article/views/Article.vue')
          }
        },
      ],
    },
  ],
})
