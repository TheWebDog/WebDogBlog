<template>
  <div class="list_div">
    <el-row :gutter="12">
      <el-col :span="24">
        <ul class="list_ul">
          <li
            class="list_li"
            v-for="(item, index) in get_articleList"
            :key="index"
            @click="to_article(item._id)"
          >
            <el-card class="list_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                :src="item.coverRequirePath"
                fit="contain"
              ></el-image>
              <ul class="textIntroduction_ul">
                <li class="textIntroduction_li">
                  <div class="el_card_title">{{ item.title }}</div>
                </li>
                <li class="textIntroduction_li">
                  <p class="el_card_generalization">{{ item.synopsis }}</p>
                </li>
                <li class="textIntroduction_li">
                  <div class="textIntroduction_li_div">
                    <el-tag class="el_card_time" type="info">
                      {{ item.date }}
                    </el-tag>
                  </div>
                  <div class="textIntroduction_li_div">
                    <el-tag class="el_card_tag">{{ item.category }}</el-tag>
                  </div>
                </li>
              </ul>
            </el-card>
          </li>
        </ul>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      :small="media_lessThan_width500px"
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
      windoWidth: document.documentElement.clientWidth,
    }
  },
  computed: {
    ...mapGetters(['get_articleList']),
    media_lessThan_width500px () {
      return this.windoWidth < 500
    },
  },
  methods: {
    ...mapActions(['action_getArticleList']),
    to_article (item) {
      this.$router.push(`/article/${item}`)
    },
  },
  created () {
    this.action_getArticleList(this.$router.currentRoute.fullPath)
  },
}
</script>