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
      path: '/login',
      name: 'login',
      component: () => {
        return import('./components/login/views/Login.vue')
      },
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => {
        return import('./components/manager/views/Manager.vue')
      },
      children: [
        {
          path: 'commentManagement',
          name: 'commentManagement',
          component: () => {
            return import('./components/login/views/Login.vue')
          }
        },
        {
          path: 'articleManagement',
          name: 'articleManagement',
          component: () => {
            return import('./components/login/views/Login.vue')
          }
        },
      ]
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => {
        return import('./components/login/views/Login.vue')
      }
    },
    {
      path: '/',
      name: '',
      component: () => {
        return import('./components/Home.vue')
      },
      children: [
        {
          path: 'list',
          name: 'list',
          component: () => {
            return import('./components/list/views/List.vue')
          }
        },
        {
          path: 'article/:id',
          name: 'article/:id',
          component: () => {
            return import('./components/article/views/Article.vue')
          },
          props: true,
        },
        {
          path: '',
          name: '',
          component: () => {
            return import('./components/HomeBody.vue')
          }
        },
      ],
    },
    {
      path: '*',
      name: 'notFound',
      component: () => {
        return import('./components/the404.vue')
      }
    },
  ],
})
