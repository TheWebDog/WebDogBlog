import Vue from 'vue'
import Vuex from 'vuex'

// 没啥大用的store 空的
import { headerStore } from './components/header'
import { footerStore } from './components/footer'
import { listStore } from './components/list'
import { asideStore } from './components/aside'
import { articleStore } from './components/article'
import { loginStore } from './components/login'
import { managerStore } from './components/manager'
 

import { writingStore } from './components/writing'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isRouterAlive: true,  // 用于刷新writing页面的state
    isRouterAliveTimeout:null,
  },
  mutations: {
    increment (state) {   // 用于刷新writing页面的方法
      state.isRouterAlive = false
      state.isRouterAliveTimeout = null
      state.isRouterAliveTimeout=setInterval(() => {
        state.isRouterAlive = true
      }, 1);
    }
  },
  modules: {
    writingStore,




    
    headerStore,
    footerStore,
    listStore,
    asideStore,
    articleStore,
    loginStore,
    managerStore,
  },
})

export default store
