// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Manager from './views/Manager.vue'

// 整合navStore
const managerStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { managerStore, Manager };