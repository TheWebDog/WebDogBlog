<template>
  <div class="search_div">
    <div class="search_Classify">
      搜索
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
    ...mapActions(['action_getSearchList']),
  },
  created () {
    this.action_getSearchList()
  },
  updated () {
    // console.log(this.$router.currentRoute.fullPath)
  },
  watch: {
    $route (to) {
      // console.log(to.fullPath,to.params);//到哪去
      // this.$store.commit('increment')
      if(to.fullPath=='/search'){
        this.activeName='-1'
      }
    }
  },
}
</script>