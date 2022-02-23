import axios from 'axios'
import { GET_COMMENTMANAGEDATA, REMOVE_COMMENT,REMOVE_CHILDREN } from './type'
export default {
  [GET_COMMENTMANAGEDATA]: function (state) {
    axios
      .post('http://localhost:4000/page/getArticleComment', {})
      .then((res) => {
        state.CommentManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_COMMENT]: function (state, id) {
    axios
    .post('http://localhost:4000/page/removeComment', { id })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [REMOVE_CHILDREN]: function (state, userCommentandid) {
    var {userComment,id} = userCommentandid
    axios
    .post('http://localhost:4000/page/removeChildren', { userComment ,id})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
}
