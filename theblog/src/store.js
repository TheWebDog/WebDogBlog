import Vue from 'vue'
import Vuex from 'vuex'

// 没啥大用的store 空的
import { headerStore } from './components/header'
import { footerStore } from './components/footer'
import { asideStore } from './components/aside'
import { articleStore } from './components/article'
import { loginStore } from './components/login'
import { managerStore } from './components/manager'
 
// 有用的store
import { writingStore } from './components/writing'
import { listStore } from './components/list'
import { articleClassifyStore } from './components/articleClassify'
import { ArticleManagementStore } from './components/articleManagement'
import {CommentManagementStore} from './components/commentManagement'

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
    listStore,
    articleClassifyStore,
    ArticleManagementStore,
    CommentManagementStore,



    
    headerStore,
    footerStore,
    asideStore,
    articleStore,
    loginStore,
    managerStore,
  },
})

export default store
