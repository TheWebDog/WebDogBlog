<template>
  <div class="list_div">
    <el-row :gutter="12">
      <el-col :span="24">
        <ul class="list_ul">
          <li class="list_li" v-for="(item, index) in get_articleList" :key="index" @click="to_article(item._id)">
            <el-card class="list_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                :src="item.coverRequirePath"
                fit="contain"
              ></el-image>
              <div class="el_card_title">{{item.title}}</div>
              <div class="el_card_generalization">{{item.synopsis}}</div>
              <el-tag class="el_card_time" type="info">{{item.date}}</el-tag>
              <el-tag class="el_card_tag">{{item.category}}</el-tag>
            </el-card>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :pager-count="5"
      :total="get_articleList.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "List",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['get_articleList']),
  },
  methods: {
    ...mapActions(['action_getArticleList']),
    to_article (item) {
      this.$router.push(`/article/${item}`)
    },
  },
  created () {
    // this.action_getArticleList()
  },
}
</script>