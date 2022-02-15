<template>
  <div class="header_div">
    <div class="blog_name">
      <div class="the_blog_name"><i class="el-icon-s-home"></i>博客名</div>
      <el-button
        plain
        icon="el-icon-s-unfold"
        @click="drawer = true"
        type="primary"
        style="margin-left: 0px"
        class="el-button-nav"
      >
      </el-button>

      <el-drawer
        title="博客名"
        :visible.sync="drawer"
        :with-header="true"
        direction="ltr"
      >
        <div>
          <el-tabs :tab-position="tabPosition" style="height: 200px">
            <el-tab-pane label="技术交流">技术交流</el-tab-pane>
            <el-tab-pane label="文章分类">文章分类</el-tab-pane>
            <el-tab-pane label="源码分享">源码分享</el-tab-pane>
            <el-tab-pane label="关于博主">关于博主</el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </div>
    <div class="header_div1">
      <el-row :gutter="20">
        <el-col :span="4" class="blog_name2">
          <el-link>
            <div class="el_col_header_div the_blog_name2" @click="to_home">
              <i class="el-icon-s-home"></i>博客名
            </div>
          </el-link>
        </el-col>
        <el-col :span="20">
          <div class="el_col_header_div">
            <ul class="header_ul">
              <li class="header_li" @click="to_article">
                <el-link type="primary" icon="el-icon-s-promotion">
                  技术交流
                </el-link>
              </li>
              <li class="header_li">
                <el-link icon="el-icon-menu">文章分类</el-link>
              </li>
              <li class="header_li">
                <el-link icon="el-icon-s-management">源码分享</el-link>
              </li>
              <li class="header_li">
                <el-link icon="el-icon-s-custom">关于博主</el-link>
              </li>
              <li class="header_li">
                <el-input
                  class="search"
                  prefix-icon="el-icon-search"
                  v-model="searchinput"
                  placeholder="请输入内容"
                  maxlength="10"
                  show-word-limit
                ></el-input>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Header",
  data () {
    return {
      searchinput: '',
      drawer: false,
      isCollapse: true,
      tabPosition: 'left',
    }
  },
  computed: {
    // ...mapGetters(['getClassifyList']),
  },
  methods: {
    // ...mapActions(['getNav','geClassifyList']),
    to_home () {
      this.$router.push('/')
    },
    to_article () {
      this.$router.push('/article')
    },
  },
  created () {

  },
}
</script>