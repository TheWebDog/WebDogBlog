import axios from 'axios'
import { GET_USERMANAGEDATA,REMOVE_USERDATA ,CHANGE_USERDATA} from './type'
export default {
  [GET_USERMANAGEDATA]: function (state) {
    axios
      .post('http://localhost:4000/user/getUserList', {})
      .then((res) => {
        state.UserManageData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  [REMOVE_USERDATA]: function (state, id) {
    axios
    .post('http://localhost:4000/user/removeUser', { id })
    .then((res) => {
      alert(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  [CHANGE_USERDATA]: function (state, idandvalue) {
    var { id,value }=idandvalue
    axios
    .post('http://localhost:4000/user/changeUser', { id,value })
    .then((res) => {
      alert(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
}
