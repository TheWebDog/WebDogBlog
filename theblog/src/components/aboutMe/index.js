// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import AboutMe from './views/AboutMe.vue'

// 整合navStore
const aboutMeStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { aboutMeStore, AboutMe };