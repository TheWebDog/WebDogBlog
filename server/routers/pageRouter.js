const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises
const async = require('async')
const PageModel = require('../models/page')
const pinyinPro = require('pinyin-pro').pinyin
const path = require('path')

const multiparty = require('multiparty') // 处理fromdata图片的中间件
var url = require('url')

// 录入信息函数
var informationEntry = async function (classify, title) {
  var time = await fsPromises.stat(`./articles/${classify}/${title}.md`)
  var date = time.birthtime.toLocaleString()
  var pinyinAndTitle =
    pinyinPro(title, { toneType: 'none' }).split(' ').join('').toLowerCase() +
    title
  const thepage = new PageModel({
    title,
    classify,
    date,
    count: 1,
    pinyinAndTitle,
  })
  thepage.save(() => {
    console.log('文件已写入')
  })
}
// 对比两个数组 并返回第一个数组多出来的值 并且去重
function diff(arr1, arr2) {
  var newArr = new Set()
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      newArr.add(arr1[i])
    }
  }
  newArr = Array.from(newArr)
  return newArr
}

// 接口--------------------------------------------------------------------------------

// 图片
// md文章图片获取
// 格式要求：res.send(`http://localhost:4000/page/getPic?picUrl=${XXX}`)
router.get('/getPic', function (req, res) {
  var { picUrl } = req.query
  res.sendFile(path.resolve(`./${picUrl}`))
})
// md文章图片删除
// 格式要求：res.send(`http://localhost:4000/page/removePic?picUrl=${XXX}`)
router.get('/removePic', function (req, res) {
  var { picUrl } = req.query
  fsPromises.unlink(`./${picUrl}`)
  res.send('removed')
})
// md文章图片增添
router.post('/submitMavonPic', function (req, res) {
  // 对图片的处理
  var form_pic = new multiparty.Form({ uploadDir: './articles/images' })
  form_pic.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('submitMavonPic时err了')
      res.send('submitMavonPic时err了')
    } else {
      var pic_path = files.mavon_editor_pic[0].path
      var requirePath = `http://localhost:4000/page/getPic?picUrl=${pic_path}`
      res.send({ requirePath, pic_path })
    }
  })
})

// 接收文章
router.post('/submitPage', function (req, res) {
  ;(async () => {
    var form_pic = new multiparty.Form({ uploadDir: './articles/images' })
    form_pic.parse(req, async (err, fields, files) => {
      if (err) {
        console.log('submitPage时err了')
        res.send('submitPage时err了')
      } else {
        var { title, category, synopsis, md, html, mdPic } = fields
        // 我去太奶奶的 竟然都是数组 就那么一项 给我整数组嘎哈 靠靠靠靠靠 mlgbz的
        var title = title[0]
        var category = category[0]
        var synopsis = synopsis[0]
        var md = md[0]
        var html = html[0]
        var pic_path = files.pic[0].path
        mdPic.push(pic_path)
        var coverRequirePath = `http://localhost:4000/page/getPic?picUrl=${pic_path}`
        var now = new Date()
        var day = now.getDate()
        var month = now.getMonth() + 1
        var year = now.getFullYear()
        var pinyinAndTitle =
        pinyinPro(title, { toneType: 'none' })
          .split(' ')
          .join('')
          .toLowerCase() + title
        const thepage = new PageModel({
          title,
          pinyinAndTitle,
          coverRequirePath,
          category,
          synopsis,
          date: `${year}-${month}-${day}`, // 日期
          md,
          html,
          mdPic,
        })
        thepage.save(function (err, result) {                  //执行
              if(err){
                console.log(err, '-----------err')
                res.send('成功')
              }else{
                console.log(result, '-----------res')
                res.send('失败')
              }
          })
      }
    })
  })()
})

// 获取分类列表
router.get('/getClassify', function (req, res) {
  ;(async () => {
    var files = await fsPromises.readdir('./articles')
    res.send(files)
  })()
})

// 通过分类获取文章
router.post('/getList', function (req, res) {
  var { classify } = req.body
  var resaultTitle = []
  ;(async () => {
    // 获取文章列表
    var resault = await PageModel.find({ classify: classify })
    // mongo的列表取出title到resaultTitle
    for (var i = 0; i < resault.length; i++) {
      resaultTitle.push(resault[i].title)
    }
    // 从分类中获取文章列表
    var thefile = await fsPromises.readdir(`./articles/${classify}`)
    // 去除thefile里的".md""
    for (var i = 0; i < thefile.length; i++) {
      thefile[i] = thefile[i].slice(0, thefile[i].length - 3)
    }
    // 比对文章列表并获取结果
    deledTitle = diff(thefile, resaultTitle)
    // 若deledTitle中有结果 表明mongoose有缺失篇目 需补录
    if (deledTitle.length != 0) {
      for (var i = 0; i < deledTitle.length; i++) {
        await informationEntry(classify, deledTitle[i])
      }
    }
    var finallyResault = await PageModel.find({ classify: classify })
    res.send(finallyResault)
  })()
})

// 通过热门获取文章
router.get('/getHot', function (req, res) {
  ;(async () => {
    var resaultClassify = []
    var allRemovePromises = []
    var deledClassify
    // 从mongoose获取列表
    var resault = await PageModel.find({})
    // mongo的列表取出classify到resaultClassify
    for (var i = 0; i < resault.length; i++) {
      resaultClassify.push(resault[i].classify)
    }
    // 从文件夹获取分类列表
    var classifyList = await fsPromises.readdir(`./articles`)
    // 将文件夹中不存在classify保存到deledClassify
    deledClassify = diff(resaultClassify, classifyList)
    // deledClassify里啥有东西 代表存在数据异常 否则需要进行数据同步
    if (deledClassify.length != 0) {
      // 从mongoose中移除不存在的相关classify文章信息
      for (var i = 0; i < deledClassify.length; i++) {
        var removePromises = PageModel.remove({ classify: deledClassify[i] })
        allRemovePromises.push(removePromises)
      }
      await Promise.all(allRemovePromises)
    }
    // 获取mongoose中存在的点击量排行前十的文章
    var finallyResault = await PageModel.find({}).sort({ count: -1 }).limit(10)
    // 发送数据
    res.send(finallyResault)
  })()
})

// 获取文章
router.post('/getPage', function (req, res) {
  var { classify, title } = req.body
  var pagePath = `./articles/${classify}/${title}.md`
  ;(async () => {
    var pageContent = await fsPromises.readFile(pagePath, 'utf-8')
    res.send(pageContent)
    var findresault = await PageModel.find({ title: title, classify: classify })
    if (findresault.length == 0) {
      // 文章在mongoose中查找不到，补录该文章基本信息
      await informationEntry(classify, title)
    } else {
      var numb = ++findresault[0].count
      await PageModel.updateOne(
        { title: title, classify: classify },
        { count: numb }
      ).catch((err) => {
        console.log(err)
      })
    }
  })()
})

// 搜索文章
router.post('/search', function (req, res) {
  var { searchWhat } = req.body
  if (!searchWhat) {
    res.send({})
  } else {
    // 去引号去空格
    var wd = searchWhat.split("'").join('').split(' ').join('').toLowerCase()
    var reg = new RegExp(`${wd}`)
    ;(async () => {
      // 查找
      var resault = await PageModel.find({ pinyinAndTitle: reg })
      res.send(resault)
    })()
  }
})

module.exports = router
