import axios from 'axios'
import { GET_ARTICLEMANAGEDATA, REMOVE_DATA } from './type'
export default {
  [GET_ARTICLEMANAGEDATA]: function (state) {
    axios
      .post('http://localhost:4000/page/getList', {})
      .then((res) => {
        state.ArticleManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_DATA]: function (state, id) {
    async function todoit () {
      await axios
        .post('http://localhost:4000/page/removeArticle', { id })
        .then((res) => {
          alert(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      await axios
        .post('http://localhost:4000/page/getList', {})
        .then((res) => {
          state.ArticleManageData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
    todoit().catch(e => console.error(e,'err'));
  },
}
