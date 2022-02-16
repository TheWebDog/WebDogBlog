// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Login from './views/Login.vue'

// 整合navStore
const loginStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { loginStore, Login };