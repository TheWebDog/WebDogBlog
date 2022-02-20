import axios from 'axios'
import { GET_ARTICLELIST } from './type'
export default {
  [GET_ARTICLELIST]: function (state) {
    axios
      .get('http://localhost:4000/page/getList')
      .then((res) => {
        state.articleList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
