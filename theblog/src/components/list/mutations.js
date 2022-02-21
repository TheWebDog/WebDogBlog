import axios from 'axios'
import { GET_ARTICLELIST,SET_INPUT_VALUE } from './type'
export default {
  [SET_INPUT_VALUE]: function (state,value) {
    state.searchInputValue = value
    // console.log(value)
    axios
    .post('http://localhost:4000/page/search', { value })
      .then((res) => {
      // console.log(res.data)
      state.articleList = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [GET_ARTICLELIST]: function (state, data) {
    var value = ''
    if (data == '/' || data == '/list' || data == '/articleClassify') {
      value = ''
      axios
        .post('http://localhost:4000/page/getList', { value })
        .then((res) => {
          state.articleList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (data.indexOf('/articleClassify') !== -1) {
      value = data.slice(17)
      axios
        .post('http://localhost:4000/page/getList', { value })
        .then((res) => {
          state.articleList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
