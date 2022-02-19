<template>
  <div class="header_div">
    <!-- 大屏时销毁此部分 -->
    <div class="blog_name" v-if="!media_over_width900px">
      <div class="the_blog_name">
        <i class="el-icon-s-home"></i>WebDog的主页
      </div>
      <el-link
        :underline="false"
        icon="el-icon-more"
        @click="drawer = true"
        type="primary"
      ></el-link>
      <el-drawer
        title="WebDog的主页"
        :visible.sync="drawer"
        :with-header="true"
        direction="ltr"
      >
        <div>
          <el-tabs
            :tab-position="tabPosition"
            style="height: 200px"
            @tab-click="handleClick"
          >
            <el-tab-pane label="博客主页">博客主页</el-tab-pane>
            <el-tab-pane label="技术交流">技术交流</el-tab-pane>
            <el-tab-pane label="文章分类">文章分类</el-tab-pane>
            <el-tab-pane label="源码分享">源码分享</el-tab-pane>
            <el-tab-pane label="关于博主">关于博主</el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </div>
    <!-- 小屏时销毁此部分 -->
    <div class="header_div1" v-if="media_over_width900px">
      <el-row :gutter="20">
        <el-col :span="5" class="blog_name2">
          <el-link>
            <div class="el_col_header_div the_blog_name2" @click="to_home">
              WebDog的主页<i class="el-icon-s-home"></i>
            </div>
          </el-link>
        </el-col>
        <el-col :span="19">
          <div class="el_col_header_div">
            <ul class="header_ul">
              <li class="header_li" @click="to_list">
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
              <li class="header_li" @click="sign_out" :hidden="!loginornot">
                <el-link>登出</el-link>
              </li>
              <li class="header_li" @click="to_login" :hidden="loginornot">
                <el-link>登入</el-link>
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
      tabPosition: 'left',
      loginornot: this.$cookies.isKey('key'),
      windoWidth: document.documentElement.clientWidth,
    }
  },
  computed: {
    // ...mapGetters(['getClassifyList']),
    media_over_width900px () {
      return this.windoWidth > 900
    },
  },
  methods: {
    // ...mapActions(['getNav','geClassifyList']),
    to_login () {
      this.$router.push('/login')
    },
    sign_out () {
      this.$cookies.remove('key')
      this.$router.push('/login')
    },
    to_home () {
      this.$router.push('/')
    },
    to_list () {
      this.$router.push('/list')
    },
    handleClick (tab) {
      // console.log(tab._props.label, event);
      switch (tab._props.label) {
        case '博客主页':
          this.to_home()
          break;
        case '技术交流':
          this.to_list()
          break;
        case '文章分类':

          break;
        case '源码分享':

          break;
        case '关于博主':

          break;

        default:
          break;
      }
    }
  },
  created () {

  },
}
</script>