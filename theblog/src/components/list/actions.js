import { GET_ARTICLELIST } from './type'
export default {
  action_getArticleList: function (context,data) {
    context.commit(GET_ARTICLELIST,data)
  },
  action_getSearchList:function (context,data) {
    context.commit(GET_ARTICLELIST,data)
  },
}