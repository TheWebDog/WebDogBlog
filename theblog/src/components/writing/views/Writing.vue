<template>
  <div class="writing_div">
    <div class="writing_el_container">
      <div class="writing_header">
        <div class="writing_header_left">
          <h1 style="text-align: center">发布文章</h1>
          <el-input
            v-model="title"
            placeholder="请输入文章标题"
            clearable
          ></el-input>

          <el-autocomplete
            v-model="category"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择文章分类"
            @select="handleSelect"
          ></el-autocomplete>

          <el-input
            class="writing_synopsis"
            type="textarea"
            :rows="3"
            placeholder="简介"
            v-model="synopsis"
            resize="none"
          >
          </el-input>
        </div>

        <div class="writing_header_right">
          <h1 style="text-align: center">上传图片</h1>
          <el-upload
            class="upload-demo writing_el_upload"
            drag
            action=""
            accept="image/jpeg, image/png, image/jpg"
            :limit="1"
            :file-list="fileList"
            list-type="picture"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :http-request="uploadSectionFile"
            :auto-upload="false"
            :on-change="onChange"
            ref="upload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">封面<br />(jpg/png,小于500kb)</div>
          </el-upload>
        </div>
      </div>

      <div class="writing_body">
        <div id="editor" class="writing_body_editor">
          <mavon-editor
            class="writing_body_mavon_editor"
            :toolbars="toolbars"
            v-model="md"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            @change="change"
          ></mavon-editor>
        </div>

        <div class="writing_btns">
          <el-button type="success" @click="PublishButton">文章发布</el-button>
          <el-button type="primary" @click="PublishSave">保存草稿</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
// import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Writing",
  comments: mavonEditor,
  created () {
    // 获取分类数据-----初始化
    this.restaurants = this.loadAllcategory();
  },
  data () {
    return {
      // v-model
      title: "", // 文章标题
      category: "", // 文章分类
      synopsis: '', // 文章简介
      restaurants: [], // 文章分类可选项  通过querySearchAsync从服务器获取
      timeout: null,// 模拟querySearchAsync从服务器获取数据
      fileList: [], // 图片暂存 没有它就不显示缩略图
      uploadFromData: new FormData(), // 图片 各种文章信息 保存 待提交发布
      md: "", // 文章内容 markdown部分
      html: "", // markdown解析成html
      tags: "", // 文章标签

      saveFromData: new FormData(), // 封面图片临时保存 保存草稿 若发布 则清空
      mdPic: new Map(), // md文章临时图片地址
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: false // 预览
      },
    };
  },

  computed: {
    // ...mapGetters([])
  },
  methods: {
    // 页面初始化有关------------------------------------------------------------
    // 文章分类部分
    loadAllcategory () {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      ];
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      cb(results);
      // // 模拟异步
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   // random随机数
      // }, 3000 * Math.random());
    },
    // 用于匹配下拉内容
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      console.log(item);
    },

    // mavon-editor有关------------------------------------------------------------
    // md文章的图片服务器端保存
    $imgAdd (pos, $file) {
      var mavon_editor_pic_formdata = new FormData();
      mavon_editor_pic_formdata.append("mavon_editor_pic", $file);
      axios
        .post('http://localhost:4000/page/submitMavonPic', mavon_editor_pic_formdata, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => {
          // 将后端返回的url替换到文本原位置
          this.mdPic.set(res.data.requirePath, res.data.pic_path);
          this.$refs.md.$img2Url(pos, res.data.requirePath);
          /*
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           *   $vm.$img2Url(pos, url);
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           *  this.$refs.md.$img2Url(pos, res.data);
           */
        })
        .catch((err) => {
          console.log(err, '--发生axios错误')
          console.log(mavon_editor_pic_formdata, '--mavon_editor_pic_formdata表单')
        })
    },
    // md文章的图片服务器端删除
    $imgDel (pos) {
      // pos.length 会多一个没用的
      for (var i = 0; i < pos.length - 1; i++) {
        this.mdPic.delete(pos[i])
        var axios_get = pos[i].replace(/getPic/, 'removePic')
        axios
          .get(axios_get)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err, '--错误')
          })
      }
    },
    change (value, render) {
      this.mdValue = value;
      this.html = render;  // render 为 markdown 解析后的结果[html]
    },


    //上传图片有关------------------------------------------------------------
    handleExceed () {
      this.$message.warning(`限制1个文件`);
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove () {
      this.saveFromData.delete('pic');
    },
    // 图片保存于临时草稿
    onChange (file) {
      // console.log('onChange', file.raw);
      this.saveFromData.append('pic', file.raw)
    },
    // 文件上传触发的函数  :http-request="uploadSectionFile"
    uploadSectionFile (param) {
      // 准备上传
      var theData = this.uploadFromData
      theData.append('pic', param.file) // 图片
      // 开始上传
      axios
        .post('http://localhost:4000/page/submitPage', theData, { headers: { "Content-Type": "multipart/form-data" } })
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





    // 两个按钮有关------------------------------------------------------------
    // 发布文章
    PublishButton () {
      var theData = this.uploadFromData
      var theTitle = this.title
      var theCategory = this.category
      var theSynopsis = this.synopsis
      var themd = this.md
      var thehtml = this.html
      var themdPic =[]
      this.mdPic.forEach((item) => {
        themdPic.push(item)
      })
      

      if (theTitle.length != 0 && theCategory.length != 0 && theSynopsis.length != 0) {
        theData.append('title', theTitle) // 标题
        theData.append('category', theCategory) // 分类
        theData.append('synopsis', theSynopsis) // 简介
        theData.append('md', themd) // md原文
        theData.append('html', thehtml) // 转化后的html
        theData.append('mdPic', themdPic) // 有关图片路径
        this.$refs.upload.submit(); // submit用于触发 uploadSectionFile
      } else {
        this.$message.error('需要将标题、分类、简介都填充完整');
      }



      // if (this.md && this.title && this.category) {
      //   // 获取文章之后的处理逻辑
      //   this.$axios
      //     .post(
      //       "/api/v1/article/create",
      //       // 构造请求参数form-data
      //       qs.stringify({
      //         title: this.title,
      //         category: this.category,
      //         ossUrl: this.OssUrl,
      //         html: this.html,
      //         tags: this.tags,
      //         status: true,
      //         md: this.md
      //       })
      //     )
      //     .then(function(response) {
      //       console.log("res:", response);
      //       if (response.data.code === 1000) {
      //         alert("文章发布成功！");
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // } else {
      //   alert("文章内容不能不空！");
      // }
    },
    // 保存文章
    PublishSave () {
      var saveData = this.saveFromData
      var theTitle = this.title
      var theCategory = this.category
      var theSynopsis = this.synopsis
      saveData.append('title', theTitle) // 标题
      saveData.append('category', theCategory) // 分类
      saveData.append('synopsis', theSynopsis) // 简介
      // 草稿上传
      // axios
      //   .post('http://localhost:4000/page/savePage', saveData, { headers: { "Content-Type": "multipart/form-data" } })
      //   .then((res) => {
      //     console.log(res.data)
      //     this.saveData = new FormData()
      //   })
      //   .catch((err) => {
      //     console.log(err, '--发生axios错误')
      //     console.log(saveData, '--saveData表单')
      //   })





      // if (this.md && this.title && this.category) {
      //   // 获取文章之后的处理逻辑
      //   this.$axios
      //     .post(
      //       "/api/v1/article/create",
      //       // 构造请求参数form-data
      //       qs.stringify({
      //         title: this.title,
      //         category: this.category,
      //         ossUrl: this.OssUrl,
      //         html: this.html,
      //         tags: this.tags,
      //         status: false,
      //         md: this.md
      //       })
      //     )
      //     .then(function(response) {
      //       alert("文章保存为草稿！");
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // } else {
      //   alert("文章内容不能不空！");
      // }
    },











  },

}
</script>