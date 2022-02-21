// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import ArticleClassify from './views/ArticleClassify.vue'

// 整合navStore
const articleClassifyStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { articleClassifyStore, ArticleClassify };