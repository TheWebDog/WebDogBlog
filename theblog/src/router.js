import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

// 破除导航重复报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
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
      // 路由守卫 通过帐号权限控制可访问页面
      beforeEnter: (to, from, next) => {
        if (VueCookies.isKey('key')) {
          if (VueCookies.get('key').power < 10) {
            next('/')
          } else {
            next('/manager')
          }
        } else {
          next()
        }
      },
    },
    {
      path: '/manager',
      name: '',
      // 因为当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性，解决办法是：即去除父级的name属性
      component: () => {
        return import('./components/manager/views/Manager.vue')
      },
      // 路由守卫 通过帐号权限控制可访问页面
      beforeEnter: (to, from, next) => {
        if (VueCookies.isKey('key')) {
          if (VueCookies.get('key').power < 10) {
            next('/')
          } else {
            next()
          }
        } else {
          next('/')
        }
      },
      children: [
        {
          path: '',
          name: 'writing',
          component: () => {
            return import('./components/writing/views/Writing.vue')
          },
        },
        {
          path: 'userManagement',
          name: 'userManagement',
          component: () => {
            return import(
              './components/userManagement/views/UserManagement.vue'
            )
          },
        },
        {
          path: 'articleManagement',
          name: 'articleManagement',
          component: () => {
            return import(
              './components/articleManagement/views/ArticleManagement.vue'
            )
          },
        },
        {
          path: 'commentManagement',
          name: 'commentManagement',
          component: () => {
            return import(
              './components/commentManagement/views/CommentManagement.vue'
            )
          },
        },
      ],
    },
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
          },
        },
        {
          path: 'list',
          name: 'list',
          component: () => {
            return import('./components/list/views/List.vue')
          },
        },
        {
          path: 'articleClassify',
          name: '',
          component: () => {
            return import('./components/articleClassify/views/ArticleClassify.vue')
          },
          children: [
            {
              path: ':id',
              name: ':id',
              component: () => {
                return import('./components/articleClassify/views/ArticleClassify.vue')
              },
            },
          ]
        },
        {
          path: 'search',
          name: 'search',
          component: () => {
            return import('./components/search/views/Search.vue')
          },
          props: true,
        },
        {
          path: 'article/:id',
          name: 'article/:id',
          component: () => {
            return import('./components/article/views/Article.vue')
          },
          props: true,
        },

      ],
    },
    {
      path: '*',
      name: 'notFound',
      component: () => {
        return import('./components/the404.vue')
      },
    },
  ],
})
