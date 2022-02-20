import axios from 'axios'
import { GET_ARTICLEPAGE } from './type'
export default {
  [GET_ARTICLEPAGE]: function (state,id) {
    axios
      .post('http://localhost:4000/page/getArticlePage',id)
      .then((res) => {
        state.article = res.data
        // console.log(state.article)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
