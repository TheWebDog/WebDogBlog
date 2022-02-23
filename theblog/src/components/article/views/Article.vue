<template>
  <div class="article_div">
    <div class="article_background">
      <div class="article_header">
        <h1 class="article_title">{{ get_ArticlePage.title }}</h1>
        <el-image
          class="article_background_img"
          :src="get_ArticlePage.coverRequirePath"
          fit="contain"
        ></el-image>
        <h4 class="article_category">
          文章分类： <el-tag>{{ get_ArticlePage.category }}</el-tag>
        </h4>
        <h4 class="article_date">
          发布日期： <el-tag>{{ get_ArticlePage.date }}</el-tag>
        </h4>
        <h2 class="article_synopsis">
          <div class="article_synopsis_first">文章简介：</div>
          <p class="article_synopsis_second">{{ get_ArticlePage.synopsis }}</p>
        </h2>
      </div>
      <link
        href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        rel="stylesheet"
      />
      <div class="markdown-body" v-html="get_ArticlePage.html" />
      <h3 class="article_date_bottom">发布日期：{{ get_ArticlePage.date }}</h3>
    </div>
    <div class="article_background">
      <div class="article_comment_header">留言</div>
      <div class="article_comment_writing">
        <div class="article_comment_writing_header">写下留言</div>

        <el-input
          class="article_comment_writing_body"
          type="textarea"
          :rows="3"
          placeholder="留下你的足迹吧"
          v-model="theComment"
          resize="none"
        >
        </el-input>

        <div class="article_comment_writing_footer">
          <el-button type="success" v-if="!loginornot" @click="to_login"
            >登录</el-button
          >
          <el-button type="primary" v-if="loginornot" @click="submit_comment"
            >发表</el-button
          >
        </div>
      </div>
      <div class="article_comments">
        <ul class="article_comment_ul">
          <li
            class="article_comment_li"
            v-for="item in get_ArticleComment"
            :key="item._id"
          >
            <div class="article_comment_li_master">
              <div class="article_comment_li_master_left">
                <el-avatar
                  class="comment_left_header"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </div>
              <div class="article_comment_li_master_right">
                <div class="comment_right_header">{{ item.userName }}</div>
                <div class="comment_right_body">{{ item.userComment }}</div>
                <div class="comment_right_footer">
                  {{ item.date }}
                  <el-link
                    icon="el-icon-edit-outline"
                    @click="replyTheComment(item._id)"
                    >回复</el-link
                  >
                </div>
              </div>
            </div>
            <ul class="comment_ul_commented">
              <li
                class="comment_li_commented"
                v-for="(childrenItem, childrenIndex) in item.childrenComment"
                :key="childrenIndex"
              >
                <div class="article_comment_li_commented">
                  <div class="article_comment_li_commented_left">
                    <el-avatar
                      class="comment_left_header"
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                  </div>
                  <div class="article_comment_li_commented_right">
                    <div class="comment_right_header">
                      {{ childrenItem.userName }}
                    </div>
                    <div class="comment_right_body">
                      {{ childrenItem.userComment }}
                    </div>
                    <div class="comment_right_footer">
                      {{ childrenItem.date }}
                      <el-link icon="el-icon-edit" @click="replyTheComment(item._id,childrenItem.userName)">回复</el-link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Article",
  props: [
    'id'
  ],
  data () {
    return {
      theComment: '',
      loginornot: this.$cookies.isKey('key'),
    }
  },
  computed: {
    ...mapGetters(['get_ArticlePage', 'get_ArticleComment']),
  },
  methods: {
    ...mapActions(['action_getArticlePage', 'action_submit_comment', 'action_getComment', 'action_submit_comment_comment']),
    to_login () {
      this.$router.push('/login')
    },
    submit_comment () {
      var userComment = this.theComment
      var articleId = this.get_ArticlePage._id
      var userName = this.$cookies.get('name').name
      var userId = this.$cookies.get('userId')._id
      this.action_submit_comment({ userComment, articleId, userName, userId, })
      this.$router.go(0)
    },
    replyTheComment (commentId, childrenUserName) {
      this.$prompt('回复', '留言', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (value) {
          var userComment;
          if (childrenUserName) {
            userComment = '@'+childrenUserName+': '+value
          } else {
            userComment = value
          }
          var userName = this.$cookies.get('name').name
          var userId = this.$cookies.get('userId')._id
          this.action_submit_comment_comment({ commentId, userComment, userName, userId, })
          this.$router.go(0)
          this.$message({
            type: 'success',
            message: '提交成功'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '未输入'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
  created () {
    this.action_getArticlePage(this.id)
    this.action_getComment(this.id)
  },
}
</script>

<style scoped>
/* md的html样式 */
@import url('../../../../node_modules/mavon-editor/dist/css/index.css');
/* 代码高亮 */
@import url('../../../../node_modules/mavon-editor/dist/highlightjs/styles/github.min.css');
</style>