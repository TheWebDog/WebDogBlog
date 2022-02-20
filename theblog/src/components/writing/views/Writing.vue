<template>
  <div class="writing_div">
    <div class="writing_el_container">
      <div class="writing_header">
        <div class="writing_header_left">
          <h1 style="text-align: center">发布文章</h1>
          <el-input
            v-model="title"
            placeholder="请输入文章标题(小于24个字)"
            clearable
          ></el-input>

          <el-autocomplete
            v-model="category"
            :fetch-suggestions="querySearchAsync"
            placeholder="请选择文章分类"
          ></el-autocomplete>

          <el-input
            class="writing_synopsis"
            type="textarea"
            :rows="3"
            placeholder="简介(小于45个字)"
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
            :toolbars="get_toolbars"
            v-model="md"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            @change="change"
          ></mavon-editor>
        </div>

        <div class="writing_btns">
          <el-button
            type="success"
            @click="PublishButton"
            icon="el-icon-document-checked"
            circle
          ></el-button>
          <el-button
            type="info"
            @click="PublishSave"
            icon="el-icon-tickets"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="clearPageInput"
            icon="el-icon-delete"
            circle
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Writing",
  comments: mavonEditor,
  created () {
    // 获取分类数据-----初始化
    this.action_querySearchAsync()
  },
  data () {
    return {
      // v-model
      title: "", // 文章标题
      category: "", // 文章分类
      synopsis: '', // 文章简介
      fileList: [], // 图片暂存 没有它就不显示缩略图
      md: "", // 文章内容 markdown部分
      html: "", // markdown解析成html

      saveFromData: new FormData(), // 封面图片临时保存 保存草稿 若发布 则清空
      mdPic: new Map(), // md文章临时图片地址
    };
  },

  computed: {
    ...mapGetters(['get_toolbars', 'get_querySearchAsync']),
  },
  methods: {
    ...mapActions(['action_querySearchAsync', 'action_uploadSectionFile', 'action_PublishButton', 'action_PublishSave']),
    // 页面初始化、获取分类有关------------------------------------------------------------
    // 文章分类部分
    querySearchAsync (queryString, cb) {
      // [{ "value": "123"},{ "value": "456"}]
      var classifyList = this.get_querySearchAsync
      var results = queryString ? classifyList.filter(this.createStateFilter(queryString)) : classifyList;
      cb(results);
    },
    // 用于匹配下拉内容
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
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
    // md文章展示
    change (value, render) {
      this.mdValue = value;
      this.html = render;  // render 为 markdown 解析后的结果[html]
    },

    //封面图片有关------------------------------------------------------------
    handleExceed () {
      this.$message.warning(`限制1个文件`);
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 封面图片从临时草稿移除
    handleRemove () {
      this.saveFromData.delete('pic');
    },
    // 封面图片保存于临时草稿
    onChange (file) {
      this.saveFromData.append('pic', file.raw)
    },
    // 文件上传触发的函数 :http-request="uploadSectionFile"
    uploadSectionFile (param) {
      this.action_uploadSectionFile(param)
      // 清空临时的保存
      this.saveFromData = new FormData()
    },

    // 按钮有关------------------------------------------------------------
    // 发布文章
    PublishButton () {
      var theTitle = this.title,
        theCategory = this.category,
        theSynopsis = this.synopsis,
        themd = this.md,
        thehtml = this.html,
        themdPic = [];
      this.mdPic.forEach((item) => {
        themdPic.push(item)
      })
      if (themd.length != 0 && theTitle.length != 0 && theCategory.length != 0 && theSynopsis.length != 0) {
        this.action_PublishButton({ theTitle, theCategory, theSynopsis, themd, thehtml, themdPic });
        this.$refs.upload.submit();// submit用于触发 uploadSectionFile
      } else {
        this.$message.error('需要将标题、分类、简介都填充完整');
      }
    },
    // 保存文章
    PublishSave () {
      var saveData = this.saveFromData,
        theTitle = this.title,
        theCategory = this.category,
        theSynopsis = this.synopsis,
        themd = this.md,
        themdPic = [];
      this.mdPic.forEach((item) => {
        themdPic.push(item)
      })

      if (themdPic.length == 0 && themd.length == 0 && theSynopsis.length == 0 && theCategory.length == 0 && theTitle.length == 0) {
        this.$message.error('啥也没输入呢，还保存个啥！？');
      } else {
        saveData.append('title', theTitle) // 标题
        saveData.append('category', theCategory) // 分类
        saveData.append('synopsis', theSynopsis) // 简介
        saveData.append('md', themd) // md原文
        saveData.append('mdPic', themdPic) // 有关图片路径
        this.action_PublishSave(saveData)
      }

    },
    // 清空文章
    clearPageInput () {
      // 删除md文章服务器端保存的图片
      var themdPic = [];
      this.mdPic.forEach((item, index) => {
        themdPic.push(index)
      })
      for (var i = 0; i < themdPic.length; i++) {
        var axios_get = themdPic[i].replace(/getPic/, 'removePic')
        axios
          .get(axios_get)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err, '--错误')
          })
      }
      // 组件重载 刷新清空输入框等数据
      this.$store.commit('increment')
    },
  },
}
</script>