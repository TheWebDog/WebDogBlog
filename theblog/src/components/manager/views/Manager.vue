<template>
  <div class="manager_div">
    <el-container>
      <el-header>
        <div class="manager_header">
          <!--定义鼠标经过时鼠标图型样式-->
          <i class="el-icon-menu manager_icon" @click="IsCollapse"></i>
          <span>博客后台</span>
          <span class="manager_sign_out" @click="sign_out">
            <el-link :underline="false">登出</el-link>
          </span>
        </div>
      </el-header>
      <el-container class="manager_body">
        <el-aside width="IsCollapse ? 50px : 300px">
          <!--collapse 水平收起菜单-->
          <el-menu
            default-active="1"
            background-color="rgba(238,238,238,.2)"
            text-color="#666"
            active-text-color="#79171c"
            class="el-menu-vertical-demo"
            :collapse="manager_isCollapse"
            :collapse-transition="true"
          >
            <!-- index的值要为字符串 -->
            <el-menu-item
              :index="item.index.toString()"
              v-for="item in MenuList"
              :key="item.index"
              @click="Manager_handleClick(item.RouterName)"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="manager_el_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Manager",
  data () {
    return {
      // Manager_searchinput: '',
      // Manager_drawer: false,
      // Manager_tabPosition: 'left',

      MenuList: [
        {
          index: 1,
          title: "发布文章",
          icon: "el-icon-edit-outline",
          RouterName: "发布文章"
        },
        {
          index: 2,
          title: "文章管理",
          icon: "el-icon-tickets",
          RouterName: "文章管理"
        },
        {
          index: 3,
          title: "评论管理",
          icon: "el-icon-chat-line-round",
          RouterName: "评论管理"
        },
        {
          index: 4,
          title: "用户管理",
          icon: "el-icon-user",
          RouterName: "用户管理"
        },
        {
          index: 5,
          title: "回到主页",
          icon: "el-icon-chat-line-round",
          RouterName: "回到主页"
        },
      ],
      manager_isCollapse: document.body.clientWidth<460? true: false,
    }
  },
  computed: {
  },
  watch: {
    /* 监听*/
    screenWidth (val) {
      this.screenWidth = val;
      console.log("this.screenWidth", this.screenWidth)
    }
  },
  methods: {
    IsCollapse () {
      this.manager_isCollapse = !this.manager_isCollapse; // 菜单是否隐藏
    },
    sign_out () {
      this.$cookies.remove('key')
      this.$router.push('/login')
    },
    to_home () {
      this.$router.push('/')
    },
    to_writing () {
      this.$router.push('/writing')
    },
    to_userManagement () {
      this.$router.push('/manager/userManagement')
    },
    to_articleManagement () {
      this.$router.push('/manager/articleManagement')
    },
    to_commentManagement () {
      this.$router.push('/manager/commentManagement')
    },
    Manager_handleClick (tab) {
      switch (tab) {
        case '回到主页':
          this.to_home()
          break;
        case '发布文章':
          this.to_writing()
          break;
        case '用户管理':
          this.to_userManagement()
          break;
        case '文章管理':
          this.to_articleManagement()
          break;
        case '评论管理':
          this.to_commentManagement()
          break;

        default:
          break;
      }
    }
  },
  created () {
    this.to_writing()
  },
}
</script>