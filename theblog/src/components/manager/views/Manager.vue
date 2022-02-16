<template>
  <div class="Home_div manager_div">
    <el-container>
      <el-header>
        <div class="Home_Header">
          <div class="header_div">
            <div class="blog_name">
              <div class="the_blog_name">
                <i class="el-icon-s-home"></i>WebDog的主页
              </div>
              <el-button
                plain
                icon="el-icon-s-unfold"
                @click="Manager_drawer = true"
                type="primary"
                style="margin-left: 0px"
                class="el-button-nav"
              >
              </el-button>

              <el-drawer
                title="WebDog的主页"
                :visible.sync="Manager_drawer"
                :with-header="true"
                direction="ltr"
              >
                <div>
                  <el-tabs
                    :tab-position="Manager_tabPosition"
                    style="height: 200px"
                    @tab-click="Manager_handleClick"
                  >
                    <el-tab-pane label="博客主页">博客主页</el-tab-pane>
                    <el-tab-pane label="写篇文章">写篇文章</el-tab-pane>
                    <el-tab-pane label="文章管理">文章管理</el-tab-pane>
                    <el-tab-pane label="评论管理">评论管理</el-tab-pane>
                  </el-tabs>
                </div>
              </el-drawer>
            </div>
            <div class="header_div1">
              <el-row :gutter="20">
                <el-col :span="5" class="blog_name2">
                  <el-link>
                    <div
                      class="el_col_header_div the_blog_name2"
                      @click="to_home"
                    >
                      WebDog的主页<i class="el-icon-s-home"></i>
                    </div>
                  </el-link>
                </el-col>
                <el-col :span="19">
                  <div class="el_col_header_div">
                    <ul class="header_ul">
                      <li class="header_li" @click="to_list">
                        <el-link type="primary" icon="el-icon-s-promotion">
                          写篇文章
                        </el-link>
                      </li>
                      <li class="header_li">
                        <el-link icon="el-icon-menu">文章管理</el-link>
                      </li>
                      <li class="header_li">
                        <el-link icon="el-icon-s-management">评论管理</el-link>
                      </li>
                      <li class="header_li">
                        <el-input
                          class="search"
                          prefix-icon="el-icon-search"
                          v-model="Manager_searchinput"
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
        </div>
      </el-header>

      <el-container class="Home_body">
        <el-main>
          <div class="Home_View">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>

      <el-footer>
        <div class="Home_Footer">
          <div class="footer_div">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="el_col_footer_div">-</div>
              </el-col>
              <el-col :span="16">
                <div class="el_col_footer_div">底部文字</div>
              </el-col>
              <el-col :span="4">
                <div class="el_col_footer_div">-</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Manager",
  data () {
    return {
      Manager_searchinput: '',
      Manager_drawer: false,
      Manager_tabPosition: 'left',
    }
  },
  computed: {
  },
  methods: {
    to_home () {
      this.$router.push('/')
    },
    to_list () {
      this.$router.push('/list')
    },
    Manager_handleClick (tab) {
      switch (tab._props.label) {
        case '博客主页':
          this.to_home()
          break;
        case '写篇文章':
          this.to_list()
          break;
        case '文章管理':

          break;
        case '评论管理':

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