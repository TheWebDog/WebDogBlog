<template>
  <div class="homeBody_div">
    <div class="homeBody_image">
      <el-image
        style="width: 100%;"
        src="http://localhost:4000/page/getPic?picUrl=public\homePage2.gif"
        fit="cover"
      ></el-image>
    </div>
    <List></List>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { List } from './list'
export default {
  name: "HomeBody",
  components: {
    List,
  },
  methods: {
    ...mapActions([]),
    // http://localhost:4000/page/getPic?picUrl=public\homePage1.gif
    // http://localhost:4000/page/getPic?picUrl=public\homePage2.gif
  },
  created () {
    
  },
}
</script>