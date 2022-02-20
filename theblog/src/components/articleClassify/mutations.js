import axios from 'axios'
import { GET_ARTICLECLASSIFYLIST } from './type'
export default {
  [GET_ARTICLECLASSIFYLIST]: function (state) {
    axios
      .get('http://localhost:4000/page/getArticleClassifyList')
      .then((res) => {
        state.articleList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
