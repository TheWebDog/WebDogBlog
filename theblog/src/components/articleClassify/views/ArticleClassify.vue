<template>
  <div class="articleClassify_div">
    <div class="articleClassify_Classify">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="classify_ul"
      >
        <el-tab-pane
          class="classify_li"
          :label="item"
          :name="index.toString()"
          v-for="(item, index) in get_querySearchAsync"
          :key="index"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="articleClassify_List">
      <List :key="this.$route.params.id"></List>
    </div>
  </div>
</template>

<script>
import { List } from '../../list/index'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "ArticleClassify",
  components: {
    List,
  },
  data () {
    return {
      activeName: '-1',
    }
  },
  computed: {
    ...mapGetters(['get_querySearchAsync']),
  },
  methods: {
    ...mapActions(['action_querySearchAsync']),
    handleClick (tab) {
      if (this.$route.params.id != tab._props.label) {
        this.$router.replace(`/articleClassify/${tab._props.label}`)
      }
    },
  },
  created () {
    this.action_querySearchAsync()
  },
  updated () {
    // console.log(this.$router.currentRoute.fullPath)
  },
  watch: {
    $route (to) {
      // console.log(to.fullPath,to.params);//到哪去
      // this.$store.commit('increment')
      if(to.fullPath=='/articleClassify'){
        this.activeName='-1'
      }
    }
  },
}
</script>