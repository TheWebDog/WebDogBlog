import { GET_ARTICLEPAGE } from './type'
export default {
  action_getArticlePage: function (context,id) {
    context.commit(GET_ARTICLEPAGE,{id})
  },
}