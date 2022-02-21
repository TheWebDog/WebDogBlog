import axios from 'axios'
import { GET_ARTICLELIST } from './type'
export default {
  [GET_ARTICLELIST]: function (state, data) {
    var value = ''
    if (data=='/' || data=='/list'|| data=='/articleClassify') {
      value = ''
    } else if(data.indexOf('/articleClassify')!==-1){
      value = data.slice(17)
    }
    axios
      .post('http://localhost:4000/page/getList',{value})
      .then((res) => {
        state.articleList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
