import { GET_ETXTAREA, GET_VALUE, GET_CLASSIFY, SUBMIT ,GET_SERVER_CLASSIFY} from './type'
import { marked } from 'marked'
import axios from 'axios'

export default {
  // 获取文章分类
  [GET_SERVER_CLASSIFY]: function (state) {
    axios
      .get('http://localhost:4000/page/getClassify')
      .then((res) => {
        state.classifyList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // 获取标题
  [GET_VALUE]: function (state, input) {
    state.title = input
  },
  // 获取文章
  [GET_ETXTAREA]: function (state, textarea) {
    state.context = textarea
  },
  // 获取分类
  [GET_CLASSIFY]: function (state, classify) {
    state.classify = classify
  },
  [SUBMIT]: function (state) {
    // 组装数据
    var obj = {
      // 标题
      title: state.title,
      // 文章-html形式
      content: marked.parse(state.context),
      // 文章-md形式
      md_content: state.context,
      // classify进行小写转换
      classify: state.classify.toLowerCase(),
    }
    // 将文章发送给后端
    axios
      .post('http://localhost:4000/page/submitPage', { ...obj })
      .then((res) => {
        var data = res.data
        alert(data)
      })
      .catch((err) => {
        console.log('res错误')
        console.log(err)
      })
  },
}
