<template>
  <div class="article_div">
    <el-row :gutter="12">
      <el-col :span="24">
        <ul class="article_ul">
          <li class="article_li">
            <el-card class="article_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-27e40447e4827ca0ac9424b8f37f6493_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647517541&t=85d311a6f2287001d45826b217edd758"
                fit="cover"
              ></el-image>
              <div class="el_card_title">标题24个字</div>
              <div class="el_card_generalization">简介45个字</div>
              <div class="el_card_author">作者</div>
              <el-tag class="el_card_time" type="info">时间</el-tag>
              <el-tag class="el_card_tag">JavaScript</el-tag>
            </el-card>
          </li>
          <li class="article_li">
            <el-card class="article_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-27e40447e4827ca0ac9424b8f37f6493_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647517541&t=85d311a6f2287001d45826b217edd758"
                fit="cover"
              ></el-image>
              <div class="el_card_title">标题24个字</div>
              <div class="el_card_generalization">简介45个字</div>
              <div class="el_card_author">作者</div>
              <el-tag class="el_card_time" type="info">时间</el-tag>
              <el-tag class="el_card_tag">JavaScript</el-tag>
            </el-card>
          </li>
          <li class="article_li">
            <el-card class="article_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-27e40447e4827ca0ac9424b8f37f6493_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647517541&t=85d311a6f2287001d45826b217edd758"
                fit="cover"
              ></el-image>
              <div class="el_card_title">标题24个字</div>
              <div class="el_card_generalization">简介45个字</div>
              <div class="el_card_author">作者</div>
              <el-tag class="el_card_time" type="info">时间</el-tag>
              <el-tag class="el_card_tag">JavaScript</el-tag>
            </el-card>
          </li>
          <li class="article_li">
            <el-card class="article_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-27e40447e4827ca0ac9424b8f37f6493_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647517541&t=85d311a6f2287001d45826b217edd758"
                fit="cover"
              ></el-image>
              <div class="el_card_title">标题24个字</div>
              <div class="el_card_generalization">简介45个字</div>
              <div class="el_card_author">作者</div>
              <el-tag class="el_card_time" type="info">时间</el-tag>
              <el-tag class="el_card_tag">JavaScript</el-tag>
            </el-card>
          </li>
          <li class="article_li">
            <el-card class="article_li_div" shadow="hover">
              <el-image
                class="el_card_el_image"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-27e40447e4827ca0ac9424b8f37f6493_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647517541&t=85d311a6f2287001d45826b217edd758"
                fit="cover"
              ></el-image>
              <div class="el_card_title">标题24个字</div>
              <div class="el_card_generalization">简介45个字</div>
              <div class="el_card_author">作者</div>
              <el-tag class="el_card_time" type="info">时间</el-tag>
              <el-tag class="el_card_tag">JavaScript</el-tag>
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
      :total="500"
    >
    </el-pagination>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Article",
  data () {
    return {

    }
  },
  computed: {
    // ...mapGetters(['getClassifyList']),
  },
  methods: {
    // ...mapActions(['getNav','geClassifyList']),
  },
  created () {

  },
}
</script>