import Vue from 'vue'
import Vuex from 'vuex'

import { headerStore } from './components/header'
import { footerStore } from './components/footer'
import { articleStore } from './components/article'
import { asideStore } from './components/aside'
 

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    headerStore,
    footerStore,
    articleStore,
    asideStore,
  },
})

export default store
