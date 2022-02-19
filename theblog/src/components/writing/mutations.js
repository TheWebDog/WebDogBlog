import { GET_SERVER_CLASSIFY, UPLOAD_File, SET_File, SAVE_File } from './type'
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
        console.log(err, '--get_querySearchAsync错误')
      })
  },
  // 填入文章-发布
  [SET_File]: function (state, data) {
    var { theTitle, theCategory, theSynopsis, themd, thehtml, themdPic } = data
    var theData = state.uploadFromData
    theData.append('title', theTitle) // 标题
    theData.append('category', theCategory) // 分类
    theData.append('synopsis', theSynopsis) // 简介
    theData.append('md', themd) // md原文
    theData.append('html', thehtml) // 转化后的html
    theData.append('mdPic', themdPic) // 有关图片路径
  },
  // 上传文章
  [UPLOAD_File]: function (state, param) {
    var theData = state.uploadFromData
    theData.append('pic', param.file)
    axios
      .post('http://localhost:4000/page/submitPage', theData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res.data)
        // 清空上传的保存
        this.uploadFromData = new FormData()
        // 清空临时的保存
        this.saveFromData = new FormData()
      })
      .catch((err) => {
        console.log(err, '--发生axios错误')
        console.log(theData, '--theData表单')
      })
  },
  // 保存文章-草稿
  [SAVE_File]: function (state, saveData) {
    axios
    .post('http://localhost:4000/page/savePage', saveData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => {
      console.log(res.data)
      // 清空上传的保存
      this.uploadFromData = new FormData()
      // 清空临时的保存
      this.saveFromData = new FormData()
    })
    .catch((err) => {
      console.log(err, '--发生axios错误')
      console.log(saveData, '--theData表单')
    })
  },
}
