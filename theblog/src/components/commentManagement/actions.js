import { GET_COMMENTMANAGEDATA,REMOVE_COMMENT } from './type'
export default {
  action_getCommentManageData: function (context) {
    context.commit(GET_COMMENTMANAGEDATA)
  },
  action_remove_comment: function (context , id) {
    context.commit(REMOVE_COMMENT , id)
  },
}