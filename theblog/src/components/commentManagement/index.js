// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import CommentManagement from './views/CommentManagement.vue'

// 整合navStore
const CommentManagementStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { CommentManagementStore, CommentManagement };