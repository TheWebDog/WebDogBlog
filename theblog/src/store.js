import Vue from 'vue'
import Vuex from 'vuex'

import { headerStore } from './components/header'
import { footerStore } from './components/footer'
import { listStore } from './components/list'
import { asideStore } from './components/aside'
import { articleStore } from './components/article'
import { loginStore } from './components/login'
 

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    headerStore,
    footerStore,
    listStore,
    asideStore,
    articleStore,
    loginStore,
  },
})

export default store
