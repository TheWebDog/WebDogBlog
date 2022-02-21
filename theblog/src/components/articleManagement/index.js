// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import ArticleManagement from './views/ArticleManagement.vue'

// 整合navStore
const ArticleManagementStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { ArticleManagementStore, ArticleManagement };