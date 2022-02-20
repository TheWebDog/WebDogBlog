<template>
  <div class="footer_div">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="el_col_footer_div">-</div>
      </el-col>
      <el-col :span="16">
        <div class="el_col_footer_div">已经在低谷了，满仓干他！</div>
      </el-col>
      <el-col :span="4">
        <div class="el_col_footer_div">-</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Footer",
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