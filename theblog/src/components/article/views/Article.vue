<template>
  <div class="article_div">
    article id：{{id}}
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Article",
  props: [
    'id'
  ],
  data () {
    return {

    }
  },
  computed: {
    // ...mapGetters(['getClassifyList']),
  },
  methods: {
    // ...mapActions(['getNav','geClassifyList']),
    getarticle(){
      console.log(this.$router.currentRoute.params.id)
    }
  },
  created () {
    this.getarticle()
  },
}
</script>