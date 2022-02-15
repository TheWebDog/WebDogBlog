// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Aside from './views/Aside.vue'

// 整合navStore
const asideStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { asideStore, Aside };