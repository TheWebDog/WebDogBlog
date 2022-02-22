import { GET_SERVER_CLASSIFY, UPLOAD_File, SET_File, SAVE_File,SET_PIC } from './type'
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
  // 填入图片-发布
  [SET_PIC]: function (state, data) {
    var { file } = data
    var theData = state.uploadFromData
    theData.append('pic', file.raw) // 封面
  },
  // 上传文章
  [UPLOAD_File]: function (state) {
    var theData = state.uploadFromData
    axios
      .post('http://localhost:4000/page/submitPage', theData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res.data)
        switch (res.data) {
          case '成功':
            alert('上传成功')
            break
          case '失败':
            alert('上传失败')
            break
          case '文章标题重复，请修改':
            alert('文章标题重复，请修改')
            break
          default:
            alert('未知错误,可能是submitPage时err了')
            break
        }
        // 清空上传的保存
        state.uploadFromData = new FormData()
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
