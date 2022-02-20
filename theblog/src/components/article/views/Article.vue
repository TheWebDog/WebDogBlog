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
          <div>{{ get_ArticlePage.synopsis }}</div>
        </h2>
      </div>
      <link
        href="https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        rel="stylesheet"
      />
      <div class="markdown-body" v-html="get_ArticlePage.html" />
      <h3 class="article_date">发布日期：{{ get_ArticlePage.date }}</h3>
    </div>
    <div class="article_background">评论</div>
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
    }
  },
  computed: {
    ...mapGetters(['get_ArticlePage']),
  },
  methods: {
    ...mapActions(['action_getArticlePage']),
  },
  created () {
    this.action_getArticlePage(this.id)
  },
}
</script>

<style scoped>
/* md的html样式 */
@import url('../../../../node_modules/mavon-editor/dist/css/index.css');
/* 代码高亮 */
@import url('../../../../node_modules/mavon-editor/dist/highlightjs/styles/github.min.css');
</style>