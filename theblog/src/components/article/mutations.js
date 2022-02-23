import axios from 'axios'
import { GET_ARTICLEPAGE, SUBMIT_COMMENT, GET_COMMENT ,SUBMIT_COMMENT_COMMENT} from './type'
export default {
  [GET_ARTICLEPAGE]: function (state, id) {
    axios
      .post('http://localhost:4000/page/getArticlePage', id)
      .then((res) => {
        state.article = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [SUBMIT_COMMENT]: function (state, obj) {
    axios
      .post('http://localhost:4000/page/submitComment', obj)
      .then((res) => {
        console.log(res.data)
        switch (res.data) {
          case '成功':
            alert('留言成功')
            break
          case '失败':
            alert('留言出错')
            break
          default:
            break
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [GET_COMMENT]: function (state, articleId) {
    axios
      .post('http://localhost:4000/page/getArticleComment', { articleId })
      .then((res) => {
        state.articleComment = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [SUBMIT_COMMENT_COMMENT]: function (state, obj) {
    axios
      .post('http://localhost:4000/page/submitCommentComment', obj)
      .then((res) => {
        console.log(res.data)
        // switch (res.data) {
        //   case '成功':
        //     alert('留言成功')
        //     break
        //   case '失败':
        //     alert('留言出错')
        //     break
        //   default:
        //     break
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
