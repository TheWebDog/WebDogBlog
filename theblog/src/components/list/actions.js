import { GET_ARTICLELIST } from './type'
export default {
  action_getArticleList: function (context) {
    context.commit(GET_ARTICLELIST)
  },
}