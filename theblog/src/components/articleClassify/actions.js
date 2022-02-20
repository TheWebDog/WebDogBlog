import { GET_ARTICLECLASSIFYLIST } from './type'
export default {
  action_getArticleClassifyList: function (context) {
    context.commit(GET_ARTICLECLASSIFYLIST)
  },
}