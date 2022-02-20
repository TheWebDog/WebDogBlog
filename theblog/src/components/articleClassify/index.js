// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import List from './views/List.vue'

// 整合navStore
const listStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { listStore, List };