// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Header from './views/Header.vue'

// 整合navStore
const headerStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { headerStore, Header };