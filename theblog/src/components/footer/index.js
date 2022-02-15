// 引入
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import Footer from './views/Footer.vue'

// 整合navStore
const footerStore = {
  state,
  getters,
  actions,
  mutations
}

// 导出
export { footerStore, Footer };