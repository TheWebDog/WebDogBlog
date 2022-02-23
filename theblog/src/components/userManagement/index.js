// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import UserManagement from './views/UserManagement.vue'

// 整合navStore
const UserManagementStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { UserManagementStore, UserManagement };