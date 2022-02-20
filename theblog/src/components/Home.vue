<template>
  <div class="Home_div">
    <el-container>
      <!-- 页头 -->
      <el-header>
        <div class="Home_Header">
          <Header></Header>
        </div>
      </el-header>

      <el-container class="Home_body">
        <!-- 内容区 -->
        <el-main class="Home_el_main">
          <div class="Home_View">
            <router-view></router-view>
          </div>
        </el-main>

        <!-- 内容侧边区 -->
        <!-- 小屏时销毁此部分 -->
        <el-aside
          class="aside_el_aside"
          width="330px"
          v-if="media_over_width1100px"
        >
          <Aside></Aside>
        </el-aside>
      </el-container>
      <!-- 大屏时销毁此部分 -->
      <div v-if="!media_over_width1100px">
        <div class="Aside_btn">
          <el-button
            type="primary"
            @click="home_drawer = true"
            icon="el-icon-arrow-left"
            circle
            plain
          ></el-button>
        </div>
        <el-drawer
          :visible.sync="home_drawer"
          :with-header="true"
          direction="rtl"
          class="aside_el_drawer"
        >
          <div class="Aside_small_width_div">
            <Aside></Aside>
          </div>
        </el-drawer>
      </div>

      <!-- 页脚 -->
      <el-footer>
        <div class="Home_Footer">
          <Footer></Footer>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { Header } from './header'
import { Footer } from './footer'
import { Aside } from './aside'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Aside,
  },
  data () {
    return {
      windoWidth: document.documentElement.clientWidth,
      home_drawer: false,
    }
  },
  computed: {
    media_over_width800px () {
      return this.windoWidth > 800
    },
    media_over_width1100px () {
      return this.windoWidth > 1100
    },
    media_width_in_801px_and_1100px () {
      return this.windoWidth > 800 && this.windoWidth < 1100
    },
  },


}
</script>
