<template>
  <div class="search_div">
    <div class="search_Classify">
      <el-page-header @back="goBack" content="搜索结果"> </el-page-header>
    </div>
    <div class="search_List">
      <List :key="this.$route.params.id"></List>
    </div>
  </div>
</template>

<script>
import { List } from '../../list/index'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Search",
  components: {
    List,
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['get_querySearchAsync']),
  },
  methods: {
    ...mapActions([]),
    goBack () {
      // this.$router.replace('/list')
      this.$router.replace('/')
    }
  },
  created () {
    if (!this.$store._modules.root.state.listStore.searchInputValue) {
      // this.$router.replace('/list')
      this.$router.replace('/')
    }
    // this.action_getSearchList()
  },
  updated () {
    // console.log(this.$router.currentRoute.fullPath)
  },
  watch: {
    $route (to) {
      // console.log(to.fullPath,to.params);//到哪去
      // this.$store.commit('increment')
      if (to.fullPath == '/search') {
        this.activeName = '-1'
      }
    }
  },
}
</script>