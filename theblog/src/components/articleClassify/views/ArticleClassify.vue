<template>
  <div class="articleClassify_div">
    <div class="articleClassify_Classify">
      <ul class="classify_ul">
        <li
          class="classify_li"
          :class="{ choicedli: $route.params.classify == item }"
          v-for="(item, index) in get_querySearchAsync"
          v-bind:key="index"
          @click="goToTheClassify(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="articleClassify_List">
      <List></List>
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
  created () {
    (async () => {
      await this.action_querySearchAsync()
      var theFirstClassify = await this.get_querySearchAsync()
      await this.goToTheClassify(theFirstClassify[0])
    })()
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['get_querySearchAsync']),
  },
  methods: {
    ...mapActions(['action_getArticleClassifyList', 'action_querySearchAsync']),
  },
  created () {
    // this.action_getArticleClassifyList()
  },
}
</script>