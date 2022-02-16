const express = require('express')
const router = express.Router()
const fsPromises = require('fs').promises
const async = require('async')
const UserModel = require('../models/user')

// 录入用户函数
var informationEntry = async function (name, password) {
  var now = new Date()
  var day = now.getDate()
  var month = now.getMonth() + 1
  var year = now.getFullYear()

  var date = `${year}-${month}-${day}`

  const theUser = new UserModel({
    name,
    password,
    date,
    // 权限大小
    power: 1,
  })
  theUser.save(() => {
    console.log('注册完成')
  })
}

// 接口--------------------------------------------------------------------------------

// 注册用户
router.post('/register', function (req, res) {
  // 检查数据大小
  var { name, password } = req.body
  console.log(name, password)
  if (name.length <= 10 && password.length <= 20) {
    // 数据大小通过
    ;(async () => {
      var findUser = await UserModel.find({ name: name })
      if (findUser==0) {
        await informationEntry(name, password)
        res.send('注册成功')
      } else {
        res.send('用户已存在')
        return
      }
    })()
  } else {
    // 数据大小不合格
    res.send('可能名字、密码过长')
  }
})



router.post('/login', function (req, res) {
  var { name, password } = req.body
  console.log(name, password)
  ;(async () => {
    // 读取user数据库
    var resault = await UserModel.find({ name: name })
    if (resault.length!=0) {
      var user=resault[0]
      if (user.password = password) {
        var power=user.power
        res.send({power})
      } else {
        res.send('密码错误')
      }
    } else {
      res.send('该用户不存在')
    }

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
