<template>
  <div class="homeBody_div">
    <div class="homeBody_image">
      <el-image
        style="width: 100%;"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170908%2F60eb87e52c2941c39693b7e8beeaab36.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647497503&t=89b330ef27fe3e8da07c5be9c5e0d035"
        fit="cover"
      ></el-image>
    </div>
    <List></List>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { List } from './list'
export default {
  name: "HomeBody",
  components: {
    List,
  },
  methods: {
    ...mapActions(['action_getArticleList']),
  },
  created () {
    this.action_getArticleList()
  },
}
</script>