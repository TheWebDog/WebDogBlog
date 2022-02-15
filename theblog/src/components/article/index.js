// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Article from './views/Article.vue'

// 整合navStore
const articleStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { articleStore, Article };