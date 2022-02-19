// 引入
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Writing from './views/Writing.vue'

// 整合searchStore
const writingStore = {
  state,
  getters,
  actions,
  mutations,
}

// 导出
export { writingStore, Writing }
