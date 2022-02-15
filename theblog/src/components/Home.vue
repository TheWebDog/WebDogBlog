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
        <el-main>
          <div class="Home_View">
            <router-view></router-view>
          </div>
        </el-main>
        
        <!-- 内容侧边区 -->
        <el-aside width="400px">
          <Aside></Aside>
        </el-aside>
      </el-container>

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


}
</script>
